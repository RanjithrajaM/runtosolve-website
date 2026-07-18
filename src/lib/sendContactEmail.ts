type ContactFields = {
  name: string;
  email: string;
  message: string;
};

/** User-facing fallback shown when the form cannot send. */
export const CONTACT_INBOX = "contact@runtosolve.com";

const DEFAULT_SUBJECT = (name: string) =>
  `RunToSolve website inquiry from ${name}`;

/**
 * Static Forms form keys are public identifiers (same as their HTML embed).
 *
 * Important: POST as `application/x-www-form-urlencoded` (no custom JSON
 * Content-Type) so the browser skips a CORS preflight — JSON fetch often
 * surfaces as "Failed to fetch" even when the API is fine.
 *
 * Protect abuse via Static Forms → Security → Domain restriction (+ CAPTCHA).
 * Docs: https://www.staticforms.dev/docs/troubleshooting
 */
export async function sendContactEmail(fields: ContactFields): Promise<void> {
  const apiKey = import.meta.env.VITE_STATICFORMS_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      `Contact form is not configured. Add VITE_STATICFORMS_API_KEY to .env, then restart the dev server.`
    );
  }

  if (apiKey.startsWith("sfacct.")) {
    throw new Error(
      `Wrong key: use the form key (sf_…) from Forms → General, not an account key (sfacct.…).`
    );
  }

  const body = new URLSearchParams({
    apiKey,
    name: fields.name,
    email: fields.email,
    message: fields.message,
    subject: DEFAULT_SUBJECT(fields.name),
    replyTo: fields.email,
    honeypot: "",
  });

  let response: Response;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15_000);
  try {
    response = await fetch("https://api.staticforms.dev/submit", {
      method: "POST",
      // URLSearchParams → form-urlencoded “simple request” (avoids CORS preflight).
      body,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(
        `The contact service took too long to respond. Please try again or email ${CONTACT_INBOX}.`
      );
    }
    throw new Error(
      `Network error reaching Static Forms. Check your connection, disable blockers for api.staticforms.dev, and under Forms → Security allow localhost (and your live domain). Or email ${CONTACT_INBOX}.`
    );
  } finally {
    window.clearTimeout(timeout);
  }

  let data: {
    success?: boolean | string;
    message?: string;
    error?: string;
  } = {};
  try {
    data = (await response.json()) as typeof data;
  } catch {
    /* non-JSON success pages still count if HTTP 200 */
    if (response.ok) return;
  }

  if (response.status === 429) {
    throw new Error(
      `Monthly form limit reached. Please email ${CONTACT_INBOX} directly.`
    );
  }

  if (response.status === 403) {
    throw new Error(
      data.message ||
        data.error ||
        `Blocked by Static Forms security. Forms → Security → Domain restriction: allow localhost and your GitHub Pages domain (or turn restriction off while testing).`
    );
  }

  if (!response.ok || data.success === false || data.success === "false") {
    const detail = data.message || data.error || `HTTP ${response.status}`;
    throw new Error(`Unable to send your message (${detail}).`);
  }
}

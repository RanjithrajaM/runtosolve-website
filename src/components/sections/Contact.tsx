import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(fields.email)) errors.email = "Enter a valid email address.";
  if (!fields.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

export function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // No backend yet: compose an email the user can send from their client.
    const subject = encodeURIComponent(`Website inquiry from ${fields.name}`);
    const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

    setSent(true);
    setFields(EMPTY);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact Us"
      title="Ready to solve your challenges?"
      description="We'd love to hear from you. Tell us about your project and our team will be in touch."
    >
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="lg:pt-2">
          <div className="rounded-3xl border border-line bg-surface-2 p-7">
            <h3 className="text-lg font-semibold text-heading">Prefer email?</h3>
            <p className="mt-2 text-sm text-muted">
              Reach us directly and we'll respond as soon as we can.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex items-center gap-2 font-medium text-brand-600 link-underline dark:text-brand-300"
            >
              <Mail size={18} />
              {site.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center rounded-3xl border border-line bg-card p-10 text-center shadow-soft"
                role="status"
              >
                <CheckCircle2 size={48} className="text-accent-500" />
                <h3 className="mt-4 text-xl font-semibold text-heading">
                  Thank you!
                </h3>
                <p className="mt-2 text-muted">
                  Your email client should have opened. We'll be in touch shortly.
                </p>
                <Button
                  variant="ghost"
                  className="mt-6"
                  onClick={() => setSent(false)}
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={onSubmit}
                noValidate
                className="rounded-3xl border border-line bg-card p-7 shadow-soft sm:p-8"
              >
                <Field
                  id="name"
                  label="Name"
                  required
                  value={fields.name}
                  onChange={update("name")}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  required
                  value={fields.email}
                  onChange={update("email")}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id="message"
                  label="Message"
                  required
                  multiline
                  value={fields.message}
                  onChange={update("message")}
                  error={errors.message}
                />
                <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
                  Send message
                  <Send size={18} />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  error?: string;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  multiline,
  error,
  autoComplete,
}: FieldProps) {
  const describedBy = error ? `${id}-error` : undefined;
  const controlClasses = cn(
    "mt-1.5 w-full rounded-xl border bg-surface px-4 py-3 text-sm text-body transition-colors duration-200 placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent-500/60",
    error ? "border-red-400" : "border-line focus:border-accent-400"
  );

  return (
    <div className="mb-5">
      <label htmlFor={id} className="text-sm font-medium text-heading">
        {label}
        {required && <span className="ml-0.5 text-accent-600">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={cn(controlClasses, "resize-y")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={controlClasses}
        />
      )}
      {error && (
        <p id={describedBy} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

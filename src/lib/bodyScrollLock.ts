let lockCount = 0;
let savedScrollY = 0;

/** iOS-safe body scroll lock (overflow:hidden alone is unreliable on Safari). */
export function lockBodyScroll() {
  if (typeof document === "undefined") return;

  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }

  lockCount += 1;
}

export function unlockBodyScroll() {
  if (typeof document === "undefined" || lockCount === 0) return;

  lockCount -= 1;
  if (lockCount > 0) return;

  const { body } = document;
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  body.style.overflow = "";
  window.scrollTo(0, savedScrollY);
}

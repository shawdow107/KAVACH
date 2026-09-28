import { useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal({
  open,
  title,
  children,
  onClose,
  dismissible = true,
  footer,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape" && dismissible && onClose) onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, dismissible, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation">
      <button
        type="button"
        className={styles.backdrop}
        aria-label={dismissible ? "Close dialog" : undefined}
        tabIndex={dismissible ? 0 : -1}
        onClick={dismissible ? onClose : undefined}
      />
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {title && (
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
        )}
        <div>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}

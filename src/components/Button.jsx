import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
  fullWidth,
  ariaLabel,
}) {
  const className = [
    styles.btn,
    styles[variant],
    fullWidth ? styles.full : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

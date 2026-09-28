import styles from "./FormField.module.css";

export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
  children,
  as = "input",
  options,
}) {
  const Control = as;

  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children ||
        (as === "select" ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            aria-invalid={Boolean(error)}
          >
            {(options || []).map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt}>
                {opt.label ?? opt}
              </option>
            ))}
          </select>
        ) : (
          <Control
            id={id}
            type={as === "input" ? type : undefined}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        ))}
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

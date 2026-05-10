import Link from 'next/link';

const variantClasses = {
  filled: { gold: 'btn btn-gold', blue: 'btn btn-blue', dark: 'btn btn-dark' },
  outlined: 'btn btn-ghost',
};

const sizeClasses = { sm: 'btn-sm', lg: 'btn-lg', md: '' };

export default function Button({
  variant = 'filled',
  color = 'gold',
  size = 'md',
  to,
  href,
  disabled = false,
  loading = false,
  children,
  className = '',
  ...props
}) {
  const base =
    variant === 'outlined'
      ? variantClasses.outlined
      : variantClasses.filled[color] ?? variantClasses.filled.gold;

  const classes = [
    base,
    sizeClasses[size],
    disabled || loading ? 'btn-disabled' : '',
    loading ? 'btn-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = loading ? (
    <>
      <span className="btn-spinner" aria-hidden="true" />
      {children}
    </>
  ) : (
    children
  );

  if (to) {
    return (
      <Link href={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}

function Button({ children, event, className: styles, disabled }) {
  return (
    <button
      onClick={event}
      disabled={disabled}
      className={`bg-gradient-to-r from-emerald-600 to-emerald-500 py-2 px-5 rounded-lg text-white font-medium transition-all ${styles}`}
    >
      {children}
    </button>
  );
}

export default Button;

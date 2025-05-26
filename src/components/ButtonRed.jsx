function ButtonRed({ children, event, className: styles, type }) {
  return (
    <button
      onClick={event}
      type={type}
      className={`bg-gradient-to-r from-red-600 to-red-500 py-2.5 px-5 rounded-lg text-white font-medium transition-all ${styles}`}
    >
      {children}
    </button>
  );
}

export default ButtonRed;

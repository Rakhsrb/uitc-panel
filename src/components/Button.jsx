function Button({ children, event }) {
  return (
    <button
      onClick={event}
      className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-2 px-5 rounded-lg text-white font-medium transition-all"
    >
      {children}
    </button>
  );
}

export default Button;

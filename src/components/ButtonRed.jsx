function ButtonRed({ children }) {
  return (
    <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-2.5 px-5 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50">
      {children}
    </button>
  );
}

export default ButtonRed;

function ErrorTitle({ children }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <Warning className="text-red-600" />
      </div>
      <h3 className="text-lg font-medium text-red-800 mb-2">{children}</h3>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
      >
        Yangilash
      </button>
    </div>
  );
}

export default ErrorTitle;

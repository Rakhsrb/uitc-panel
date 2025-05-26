function LoadingAnimation({ children }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex justify-center items-center space-x-2 mb-4">
        <div
          className="w-4 h-4 rounded-full bg-blue-400 animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></div>
      </div>
      <p className="text-blue-600 uppercase font-bold">{children}</p>
    </div>
  );
}

export default LoadingAnimation;

function PageTitle({ children }) {
  return (
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
      {children}
    </h1>
  );
}

export default PageTitle;

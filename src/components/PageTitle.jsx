function PageTitle({ children, className: styles }) {
  return (
    <h1
      className={`text-2xl md:text-3xl lg:text-4xl font-bold text-blue-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 ${styles}`}
    >
      {children}
    </h1>
  );
}

export default PageTitle;

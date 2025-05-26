function NoDataTitle({ children }) {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <h3 className="text-lg font-medium opacity-40 mb-2 uppercase">
        {children}
      </h3>
    </div>
  );
}

export default NoDataTitle;

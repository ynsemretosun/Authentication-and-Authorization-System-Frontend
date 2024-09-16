function Spinner({ fullScreen = false }) {
  return (
    <div
      className={` ${
        fullScreen === false ? "h-[80vh]" : "h-screen"
      }  flex  items-center justify-center`}
    >
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-sky-700"></div>
    </div>
  );
}

export default Spinner;

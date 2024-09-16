import { useEffect, useRef } from "react";

function Modal({ message, title, onCancel, children }) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) onCancel();
      }
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    },
    [onCancel],
  );
  return (
    <div className="fixed inset-0 z-[1000] h-screen w-full backdrop-blur-sm transition-all duration-500">
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-stone-50 p-8 text-gray-900 shadow-2xl transition-all duration-500"
        ref={ref}
      >
        <button
          className="absolute right-2 top-2 rounded-full p-2 text-gray-900 transition hover:bg-gray-200 hover:text-gray-700"
          onClick={onCancel}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h1 className="mb-6 text-3xl font-extrabold underline underline-offset-4">
          {title}
        </h1>
        <p className="text-md mb-6">{message}</p>
        {children}
      </div>
    </div>
  );
}

export default Modal;

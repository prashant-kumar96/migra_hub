const DocModal = ({ docData, setisDocModalOpen }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log("docData", docData);
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="flex justify-center items-center bg-gray-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full w-full h-full">
        <button
          type="button"
          onClick={() => setisDocModalOpen(false)}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="default-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-full">
          <div className="items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 h-full">
            {docData.map((doc, idx) => (
              <div className="w-full h-full">
                {doc.mimetype === "application/pdf" ? (
                  <object
                    data={`${backendUrl}${doc?.path}`}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  >
                    <p>
                      Alternative text - include a link{" "}
                      <a href={`${backendUrl}${doc?.path}`}>to the PDF!</a>
                    </p>
                  </object>
                ) : (
                  <img
                    key={idx}
                    className="w-full h-auto rounded-md shadow-md pt-10"
                    src={`${backendUrl}${doc?.path}`}
                    alt={`Passport image ${idx + 1}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocModal;

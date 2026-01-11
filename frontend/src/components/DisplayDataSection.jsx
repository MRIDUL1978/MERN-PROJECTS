import React from "react";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";

const DisplayDataSection = ({
  passwordsList,
  handleEditChange,
  handleDeleteChange,
}) => {
  const handleCopyPassword = async (password) => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy password");
    }
  };

  return (
    <section className="mt-12 flex justify-center px-4 pb-12">
      <div className="w-full max-w-4xl">
        {passwordsList.length > 0 && (
          <h2 className="text-2xl font-semibold text-slate-300 mb-6 text-center md:text-left">
            Your Saved Passwords
          </h2>
        )}
        <div className="space-y-4">
          {passwordsList.map((item, index) => {
            return (
              <div
                key={item.id}
                className="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-750 transition-colors duration-200 gap-4"
              >
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-400 min-w-[80px]">
                      Website:
                    </span>
                    <p className="text-white font-medium break-all">
                      {item.siteName}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-400 min-w-[80px]">
                      Password:
                    </span>
                    <p className="text-slate-300 font-mono">
                      {typeof item.password === "string"
                        ? "•".repeat(item.password.length)
                        : ""}
                    </p>
                    <button
                      onClick={() => {
                        handleCopyPassword(item.password);
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
                      title="Copy Password"
                    >
                      <FiCopy />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <button
                    onClick={() => {
                      handleEditChange(item.id);
                    }}
                    className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 text-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteChange(item.id);
                    }}
                    className="flex-1 md:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800 text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {passwordsList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No passwords saved yet. Add your first password above!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayDataSection;

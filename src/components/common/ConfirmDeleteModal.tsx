import React, { useState, type ReactNode } from "react";

type ConfirmDeleteModalProps = {
  /** The text required to enable the delete action. Defaults to "DELETE" */
  confirmationWord?: string;
  /** Title displayed on the popup header */
  title?: string;
  /** Additional warning message or description */
  description?: string;
  /** Function called when the user successfully confirms deletion */
  onConfirm: () => void | Promise<void>;
  /** Optional custom trigger button element */
  children?: ReactNode;
};

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  confirmationWord = "DELETE",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Please type the word below to confirm.",
  onConfirm,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isMatched = inputValue.trim().toUpperCase() === confirmationWord.toUpperCase();

  const handleOpen = () => {
    setInputValue("");
    setIsOpen(true);
  };

  const handleClose = () => {
    if (isDeleting) return; // Prevent closing mid-request
    setInputValue("");
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    if (!isMatched) return;
    try {
      setIsDeleting(true);
      await onConfirm();
      handleClose();
    } catch (error) {
      console.error("Failed to execute deletion action:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Trigger: Either custom child element or default Delete button */}
      {children ? (
        <span onClick={handleOpen} className="inline-block cursor-pointer w-full">
          {children}
        </span>
      ) : (
        <button
          type="button"
          onClick={handleOpen}
          className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      )}

      {/* Confirmation Backdrop & Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-4 text-gray-800">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Type <span className="font-bold text-red-600">"{confirmationWord}"</span> to proceed:
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={confirmationWord}
                autoFocus
                className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-sm transition-all border-gray-300"
              />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!isMatched || isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
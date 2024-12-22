import { CrossIcon } from "../icons/CrossIcon.tsx";
import { Form } from "./Form.tsx";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function Modal({ open, onClose }: ModalProps) {
  return (
    <div>
      {open && (
        <div
          className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="bg-white p-6 rounded-md shadow-lg sm:w-96 w-9/12 ml-62">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <div className="cursor-pointer" onClick={onClose}>
                <CrossIcon size="lg" />
              </div>
            </div>

            {/* Form */}
            <Form />
          </div>
        </div>
      )}
    </div>
  );
}

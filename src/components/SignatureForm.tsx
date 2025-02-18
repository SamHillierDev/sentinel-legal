import { useRef, useState } from "react";
import { FiArrowLeft, FiCheck, FiEdit3 } from "react-icons/fi";
import SignatureCanvas from "react-signature-canvas";
import { useUpdateUser } from "../hooks/useUpdateUser";

interface SignatureFormProps {
  signature: string | null;
  setSignature: (value: string | null) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({
  setSignature,
  onBack,
  onSubmit,
}) => {
  const sigPad = useRef<SignatureCanvas>(null);
  const [error, setError] = useState("");
  const updateUser = useUpdateUser();

  const clearSignature = () => {
    sigPad.current?.clear();
    setSignature(null);
    setError("");
  };

  const handleSave = () => {
    if (sigPad.current?.isEmpty()) {
      setError("Signature is required.");
      return;
    }
    const signatureData = sigPad.current?.toDataURL("image/png") || null;
    setSignature(signatureData);
    setError("");

    updateUser.mutate({ signature: signatureData }, { onSuccess: onSubmit });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <FiEdit3 className="text-xl text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-700">Your signature</h2>
      </div>
      <p className="text-sm text-gray-600">
        Please sign within the box using your finger or mouse.
      </p>

      <div className="mt-3 overflow-hidden rounded-lg border-2 border-gray-400">
        <SignatureCanvas
          ref={sigPad}
          penColor="black"
          canvasProps={{ width: 350, height: 150, className: "sigCanvas" }}
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={clearSignature}
          className="cursor-pointer rounded-full bg-gray-400 px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-500"
        >
          Reset Signature
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        By signing above and clicking 'Find my agreement(s)', you agree that we
        will run a soft credit check to identify any potential car finance
        claims. These searches will not impact your credit score but will verify
        any agreements that are found.
      </p>

      <div className="mt-4 flex justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-400 px-2 py-2 text-lg font-semibold text-white shadow-inner shadow-gray-300 transition hover:bg-gray-500"
        >
          <FiArrowLeft className="text-xl" />
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-lg font-semibold text-white shadow-inner shadow-emerald-200 transition hover:bg-emerald-600"
        >
          Submit
          <FiCheck className="text-xl" />
        </button>
      </div>
    </>
  );
};

export default SignatureForm;

import { useLocalStorage } from "usehooks-ts";

export const ProveStepPresentational = ({
  requestWebProof,
  isPending,
  disabled,
  setDisabled,
}: {
  requestWebProof: () => void;
  isPending: boolean;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
}) => {
  const [instagramHandle] = useLocalStorage("instagramHandle", "");
  return (
    <>
      <div className="mt-7 flex justify-center flex-col items-center">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <div className="mb-3">
            <span className="font-medium text-blue-800">Verifying handle: </span>
            <span className="text-blue-600">@{instagramHandle.replace('@', '')}</span>
          </div>
          <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-700">
            <li>Click "Open Extension" below</li>
            <li>Follow the vlayer extension prompts</li>
            <li>Log into Instagram when prompted</li>
            <li>Navigate to your Instagram profile page (@{instagramHandle.replace('@', '')})</li>
            <li>Wait for the extension to capture your profile data automatically</li>
          </ol>
          <p className="text-blue-600 text-xs mt-2">Note: The extension will automatically detect the Instagram API call when you visit your profile page.</p>
        </div>
        <button
          disabled={disabled}
          id="nextButton"
          onClick={() => {
            requestWebProof();
            setDisabled(true);
          }}
        >
          {isPending ? "Proving in progress..." : "Open Extension"}
        </button>
      </div>
    </>
  );
};

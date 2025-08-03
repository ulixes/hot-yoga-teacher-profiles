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
  return (
    <>
      <div className="mt-7 flex justify-center flex-col items-center">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-700">
            <li>Click "Open Extension" below</li>
            <li>Follow the vlayer extension prompts</li>
            <li>Log into Instagram when prompted</li>
            <li>Navigate to your profile page (click your profile picture)</li>
            <li>Wait for the extension to capture the proof</li>
          </ol>
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

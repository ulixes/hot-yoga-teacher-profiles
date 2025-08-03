export const MintStepPresentational = ({
  handleMint,
  isMinting,
  isGeneratingProof,
  hasProof,
}: {
  handleMint: () => void;
  isMinting: boolean;
  isGeneratingProof: boolean;
  hasProof: boolean;
}) => {
  return (
    <>
      <div className="mt-7 flex justify-center flex-col items-center">
        {isGeneratingProof && !hasProof && (
          <div className="mb-4 text-center">
            <p className="text-blue-600 mb-2">Generating proof from your Instagram verification...</p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}
        {hasProof && (
          <p className="text-green-600 mb-4">✓ Instagram proof generated successfully!</p>
        )}
        <button 
          disabled={isMinting || isGeneratingProof || !hasProof} 
          id="nextButton" 
          onClick={handleMint}
        >
          {isMinting ? "Creating Profile..." : 
           isGeneratingProof ? "Generating Proof..." : 
           hasProof ? "Create Teacher Profile" : "Preparing..."}
        </button>
      </div>
    </>
  );
};

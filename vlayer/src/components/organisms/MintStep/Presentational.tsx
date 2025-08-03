import { useState } from 'react';

export const MintStepPresentational = ({
  handleMint,
  isMinting,
  isGeneratingProof,
  hasProof,
}: {
  handleMint: (bio: string, specialization: string) => void;
  isMinting: boolean;
  isGeneratingProof: boolean;
  hasProof: boolean;
}) => {
  const [bio, setBio] = useState('');
  const [specialization, setSpecialization] = useState('');
  
  const isFormValid = bio.trim().length > 0 && specialization.trim().length > 0;

  return (
    <>
      <div className="mt-7 flex justify-center flex-col items-center max-w-2xl mx-auto">
        {isGeneratingProof && !hasProof && (
          <div className="mb-6 text-center">
            <div className="text-4xl mb-3">🔄</div>
            <p className="text-orange-600 mb-2 font-semibold">Generating proof from your Instagram verification...</p>
            <div className="animate-spin w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}
        
        {hasProof && (
          <>
            <div className="mb-6 text-center">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-green-600 font-semibold">Instagram proof generated successfully!</p>
              <p className="text-gray-600 text-sm mt-1">Now complete your teacher profile</p>
            </div>
            
            <div className="w-full space-y-6 bg-white p-6 rounded-lg shadow-sm border">
              <div>
                <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about your yoga journey and teaching experience... (e.g., '10+ years teaching hot vinyasa yoga, certified RYT-500, passionate about mindful movement and breathing techniques.')"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{bio.length}/500 characters</p>
              </div>
              
              <div>
                <label htmlFor="specialization" className="block text-sm font-semibold text-gray-700 mb-2">
                  Specializations
                </label>
                <input
                  id="specialization"
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="Hot Yoga, Bikram, Vinyasa, Therapy, Meditation..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated specialties ({specialization.length}/200 characters)</p>
              </div>
            </div>
          </>
        )}
        
        <button 
          disabled={isMinting || isGeneratingProof || !hasProof || !isFormValid} 
          id="nextButton" 
          onClick={() => handleMint(bio, specialization)}
          className={`mt-6 px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
            isMinting || isGeneratingProof || !hasProof || !isFormValid
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          {isMinting ? "Creating Profile..." : 
           isGeneratingProof ? "Generating Proof..." : 
           hasProof ? "Create Teacher Profile" : "Preparing..."}
        </button>
        
        {hasProof && !isFormValid && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            Please fill in both bio and specializations to continue
          </p>
        )}
      </div>
    </>
  );
};

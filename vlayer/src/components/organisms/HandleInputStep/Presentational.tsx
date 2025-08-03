import { useState } from "react";

export const HandleInputStepPresentational = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (handle: string) => void;
  isLoading: boolean;
}) => {
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");

  const validateHandle = (input: string) => {
    // Remove @ if user includes it
    const cleanHandle = input.replace(/^@/, "");
    
    if (!cleanHandle) {
      setError("Please enter your Instagram handle");
      return false;
    }
    
    if (cleanHandle.length < 1 || cleanHandle.length > 30) {
      setError("Instagram handle must be between 1-30 characters");
      return false;
    }
    
    if (!/^[a-zA-Z0-9._]+$/.test(cleanHandle)) {
      setError("Instagram handle can only contain letters, numbers, dots, and underscores");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanHandle = handle.replace(/^@/, "");
    
    if (validateHandle(cleanHandle)) {
      onSubmit(cleanHandle);
    }
  };

  return (
    <div className="mt-7 flex justify-center flex-col items-center max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label htmlFor="instagram-handle" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your Instagram handle
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">@</span>
            <input
              id="instagram-handle"
              type="text"
              value={handle}
              onChange={(e) => {
                setHandle(e.target.value);
                if (error) validateHandle(e.target.value);
              }}
              placeholder="coolhandle"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !handle.trim()}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Processing..." : "Verify Instagram Handle"}
        </button>
      </form>
      
      <div className="mt-6 text-sm text-gray-600 text-center">
        <p>You'll need to prove ownership of this Instagram account in the next step.</p>
        <p className="mt-2">Make sure you can log into this account.</p>
      </div>
    </div>
  );
};
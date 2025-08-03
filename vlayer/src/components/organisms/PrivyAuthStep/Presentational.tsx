import { Modal } from "../../layout/Modal";

type Props = {
  isAuthenticated: boolean;
  next: () => void;
  authenticateUser: () => void;
  logoutUser: () => void;
  userEmail: string;
};

export const PrivyAuthStepPresentational: React.FC<Props> = ({
  isAuthenticated,
  next,
  authenticateUser,
  logoutUser,
  userEmail,
}) => {
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🧘‍♀️</div>
          <h2 className="text-3xl font-bold text-gray-900">
            Authenticate Your Account
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Sign in with your email to create your hot yoga teacher profile. 
            We'll automatically create a secure wallet for you.
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={authenticateUser}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            Sign In to Continue
          </button>
          
          <p className="text-sm text-gray-500 max-w-sm text-center">
            Choose from email, Google, or Discord authentication. 
            A secure wallet will be created automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome Back!
          </h2>
          <p className="text-lg text-gray-600">
            Signed in as: <span className="font-semibold text-orange-600">{userEmail}</span>
          </p>
          <p className="text-base text-gray-500 max-w-md mx-auto">
            Your secure wallet has been created. Ready to complete your yoga teacher profile!
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={next}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            Continue to Profile Creation
          </button>
          
          <button
            onClick={logoutUser}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Sign out
          </button>
        </div>
      </div>
      
      <Modal>
        <div className="text-center space-y-4">
          <div className="text-4xl mb-2">🧘‍♀️</div>
          <h3 className="text-xl font-bold text-gray-900">Authentication Successful</h3>
          <p className="text-gray-600">
            Great! You're signed in and your wallet is ready.
          </p>
          <p className="text-sm text-gray-500">
            Logged in as: {userEmail}
          </p>
          <button
            onClick={next}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </Modal>
    </>
  );
};
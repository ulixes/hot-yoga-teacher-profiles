import { Link } from "react-router";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
export const SuccessStepPresentational = ({
  tx,
  handle,
  blockExplorer,
}: {
  tx: string;
  handle: string;
  blockExplorer?: string;
}) => {
  return (
    <>
      <p className="text-gray-500">
        Welcome to the Hot Yoga Teacher community! Your verified profile for @{handle} has been created. Transaction:{" "}
        <a
          href={`${blockExplorer}/tx/${tx}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 underline"
        >
          {tx.slice(0, 6)}...{tx.slice(-4)}
        </a>
      </p>
      <p className="text-gray-500">
        <a
          href={`${blockExplorer}/tx/${tx}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold leading-4 text-center text-orange-600 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 inline-flex items-center"
          tabIndex={0}
        >
          See it on block explorer
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 ml-1" />
        </a>
      </p>
      <div className="mt-2 flex justify-center">
        <Link to="/" id="nextButton">
          Add Another Teacher
        </Link>
      </div>
    </>
  );
};

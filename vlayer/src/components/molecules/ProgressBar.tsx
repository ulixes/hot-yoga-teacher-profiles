import { useCurrentStep } from "../../hooks/useCurentStep";
import { motion } from "motion/react";
export const ProgressBar = () => {
  const { currentStep } = useCurrentStep();
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.3, delay: 0.4 }}
      className="steps w-full"
    >
      <li
        className={`step ${currentStep?.index !== undefined && currentStep?.index >= 1 ? "step-primary" : ""} text-black text-xs`}
      >
        Enter Handle
      </li>
      <li
        className={`step ${currentStep?.index !== undefined && currentStep?.index >= 2 ? "step-primary" : ""} text-black text-xs`}
      >
        Verify Instagram
      </li>
      <li
        className={`step ${currentStep?.index !== undefined && currentStep?.index >= 3 ? "step-primary" : ""} text-black text-xs`}
      >
        Connect Wallet
      </li>
      <li
        className={`step ${currentStep?.index !== undefined && currentStep?.index >= 4 ? "step-primary" : ""} text-black text-xs`}
      >
        Create Profile
      </li>
    </motion.ul>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import { HandleInputStepPresentational } from "./Presentational";

export const HandleInputStep = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [, setInstagramHandle] = useLocalStorage("instagramHandle", "");

  const handleSubmit = async (handle: string) => {
    setIsLoading(true);
    
    try {
      // Store the handle for later use
      setInstagramHandle(handle);
      
      // Navigate to the proof step
      navigate("/verify-instagram");
    } catch (error) {
      console.error("Error processing handle:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HandleInputStepPresentational 
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};
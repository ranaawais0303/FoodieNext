"use client";
import { useFormStatus } from "react-dom";
const MealsFormSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meals"}
    </button>
  );
};
export default MealsFormSubmit;

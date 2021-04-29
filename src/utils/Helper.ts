export const handleEnableDisable = (isDisable?: boolean): any => {
  return isDisable
    ? { opacity: 0.5, pointerEvents: "none" }
    : { opacity: 1, pointerEvents: "auto" };
};

import { useEffect, useState } from "react";

// A flag that switches itself off after `duration` ms, for brief feedback
// like "ADDED ✓". Returns [isOn, flash].
export const useFlash = (duration = 1500) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (!isOn) return;
    const timer = setTimeout(() => setIsOn(false), duration);
    return () => clearTimeout(timer);
  }, [isOn, duration]);

  return [isOn, () => setIsOn(true)];
};

import { useEffect, useState } from "react";

export default function useViewport() {
  const [width, setWidth] = useState<any>(null);

  const handleResize = () =>
    setWidth(typeof window === "undefined" ? 0 : window?.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return width <= 880;
}

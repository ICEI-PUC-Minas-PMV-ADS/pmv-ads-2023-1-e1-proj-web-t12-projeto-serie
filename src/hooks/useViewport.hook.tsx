import { useEffect, useState } from "react";

export default function useViewport() {
  const [width, setWidth] = useState<any>();

  const handleResize = () =>
    setWidth(typeof window === "undefined" ? null : window?.innerWidth);

  useEffect(() => {
    setWidth(window?.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return width <= 880;
}

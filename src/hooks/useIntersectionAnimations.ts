import { useEffect, useRef } from "react";

export const useIntersectionAnimations = () => {
  const animatedElementsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  useEffect(() => {
    const obsOptions = { rootMargin: "-65px" };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;

          const animationClass = target.dataset.animate;
          if (animationClass) {
            target.classList.add(`animate-${animationClass}`);
          }

          if (target.classList.contains("footer")) {
            animatedElementsRef.current?.forEach((el) => {
              el.classList.remove(
                "animate-right",
                "animate-left",
                "animate-top",
                "animate-bottom"
              );
            });
          }
        }
      });
    }, obsOptions);

    animatedElementsRef.current = document.querySelectorAll("[data-animate]");

    animatedElementsRef.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return { animatedElementsRef };
};

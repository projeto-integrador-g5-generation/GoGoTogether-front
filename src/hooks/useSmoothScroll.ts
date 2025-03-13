import { useEffect } from "react";

declare global {
  interface Window {
    smoothMousewheel?: boolean;
  }
}

export const useSmoothScroll = (): void => {
  useEffect(() => {
    const scrollSmooth = {
      friction: 0.01,
      deltaSteps: 100,
      scrollwheel: false,
      viewY: window.scrollY,
      scrollToY: window.scrollY,

      onAnimationFrame: () => {
        scrollSmooth.viewY +=
          (scrollSmooth.scrollToY - scrollSmooth.viewY) * scrollSmooth.friction;
        window.scrollTo(window.scrollX, Math.round(scrollSmooth.viewY));

        if (Math.abs(scrollSmooth.scrollToY - scrollSmooth.viewY) > 1) {
          requestAnimationFrame(scrollSmooth.onAnimationFrame);
        } else {
          window.scrollTo(window.scrollX, scrollSmooth.scrollToY);
          scrollSmooth.scrollwheel = false;
        }
      },

      onMouseWheel: (e: WheelEvent) => {
        const deltaFactor = (e.deltaY * scrollSmooth.deltaSteps) / 100;
        scrollSmooth.scrollwheel = true;
        scrollSmooth.scrollToY += deltaFactor;

        scrollSmooth.scrollToY = Math.max(
          0,
          Math.min(
            scrollSmooth.scrollToY,
            document.documentElement.scrollHeight - window.innerHeight
          )
        );

        requestAnimationFrame(scrollSmooth.onAnimationFrame);
        e.preventDefault();
      },

      onScroll: () => {
        if (scrollSmooth.scrollwheel) return;
        scrollSmooth.scrollToY = window.scrollY;
        scrollSmooth.viewY = window.scrollY;
      },

      onAnchor: (anchor: HTMLAnchorElement) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          scrollSmooth.scrollwheel = true;
          const target = document.querySelector(
            anchor.getAttribute("href") || ""
          );
          if (target) {
            const targetPosition =
              target.getBoundingClientRect().top + window.scrollY;
            scrollSmooth.scrollToY = targetPosition;
            requestAnimationFrame(scrollSmooth.onAnimationFrame);
          }
        });
      },

      isMobile: () => window.innerWidth <= 768,

      init: () => {
        if (scrollSmooth.isMobile()) {
          document.documentElement.style.scrollBehavior = "smooth";
          return;
        }

        document.documentElement.style.scrollBehavior = "initial";
        window.smoothMousewheel = true;
        window.addEventListener("wheel", scrollSmooth.onMouseWheel, {
          passive: false,
        });
        window.addEventListener("scroll", scrollSmooth.onScroll);
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          if (anchor instanceof HTMLAnchorElement) {
            scrollSmooth.onAnchor(anchor);
          }
        });
      },
    };

    scrollSmooth.init();

    return () => {
      window.removeEventListener("wheel", scrollSmooth.onMouseWheel);
      window.removeEventListener("scroll", scrollSmooth.onScroll);
    };
  }, []);
};

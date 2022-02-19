import React, { useEffect, useState } from "react";

const HeadlineHighlight = () => {
  const [isVisible, setIsVisible] = useState(0);

  useEffect(() => {
    if (isVisible >= 0 && isVisible !== 4) {
      setTimeout(() => {
        setIsVisible(isVisible + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setIsVisible(0);
      }, 2000);
    }
  }, [isVisible]);

  return (
    <span className="headline-highlight">
      <span className={`${isVisible === 0 ? "is-visible" : "is-hidden"}`}>
        Gaming
      </span>
      <span
        className={`slide-2 ${isVisible === 1 ? "is-visible" : "is-hidden"}`}
      >
        Pelajar
      </span>
      <span
        className={`slide-3 ${isVisible === 2 ? "is-visible" : "is-hidden"}`}
      >
        Designer
      </span>
      <span
        className={`slide-4 ${isVisible === 3 ? "is-visible" : "is-hidden"}`}
      >
        Editor
      </span>
      <span
        className={`slide-5 ${isVisible === 4 ? "is-visible" : "is-hidden"}`}
      >
        Entrepreneur
      </span>
    </span>
  );
};

export default HeadlineHighlight;

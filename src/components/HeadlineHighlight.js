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
    <div className="headline-highlight">
      <span class={`slide-1 ${isVisible === 0 ? "is-visible" : "is-hidden"}`}>
        Gaming
      </span>
      <span class={`slide-2 ${isVisible === 1 ? "is-visible" : "is-hidden"}`}>
        Pelajar
      </span>
      <span class={`slide-3 ${isVisible === 2 ? "is-visible" : "is-hidden"}`}>
        Designer
      </span>
      <span class={`slide-4 ${isVisible === 3 ? "is-visible" : "is-hidden"}`}>
        Editor
      </span>
      <span class={`slide-5 ${isVisible === 4 ? "is-visible" : "is-hidden"}`}>
        Entrepreneur
      </span>
    </div>
  );
};

export default HeadlineHighlight;

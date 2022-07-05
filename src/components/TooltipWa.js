import { Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";

const TooltipWa = () => {
  const [show, setShow] = useState(null);

  useEffect(() => {
    if (show === null) {
      setTimeout(() => {
        setShow(true);
      }, 15000);
    }

    // if (show === true) {
    //   setTimeout(() => {
    //     setShow(false);
    //   }, 10000);
    // }
  }, [show]);

  return (
    <Zoom in={show} style={{ transitionDelay: show ? "500ms" : "0ms" }}>
      <span className="tooltip-wa">
        <span>Masih bingung atau ada pertanyaan?</span>
        <span>yuk segera hubungi kami via Whatsapp</span>
      </span>
    </Zoom>
  );
};

export default TooltipWa;

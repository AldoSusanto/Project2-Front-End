import React from "react";
import { Toast, ToastHeader } from "reactstrap";

const ToastAlert = (props) => {
  return (
    <div className="toast-container">
      <Toast className="toast-success" isOpen={props.showToastSuccess}>
        <ToastHeader toggle={props.toggleToastSuccess}>
          Rekomendasi sudah terkirim! silahkan cek email kamu.
        </ToastHeader>
      </Toast>
      <Toast className="toast-failed" isOpen={props.showToastFailed}>
        <ToastHeader toggle={props.toggleToastFailed}>
          Rekomendasi gagal dikirim! mohon periksa email kamu.
        </ToastHeader>
      </Toast>
    </div>
  );
};

export default ToastAlert;

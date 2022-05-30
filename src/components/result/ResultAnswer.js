import React from "react";
import { MdCircle } from "react-icons/md";

const ResultAnswer = (props) => {
  return (
    <div className="resultAnswer">
      <h3 className="resultAnswer-title">Jawaban Kamu</h3>
      <div className="resultAnswer-body">
        <div className="quizAnswer">
          <h5 className="quizAnswer-title">Budget</h5>
          <p className="quizAnswer-price">{`${
            props.reqBody.priceRange !== "budgetUnknown"
              ? `${props.reqBody.priceRange} Juta`
              : `Belum tahu - ${
                  props.reqBody.pricePref === "LOW"
                    ? "Pilihkan laptop dengan spesifikasi budget friendly"
                    : props.reqBody.pricePref === "MEDIUM"
                    ? "Pilihkan laptop dengan spesifikasi recommended"
                    : "Pilihkan laptop dengan spesifikasi maximal"
                }`
          }`}</p>
        </div>
        <div className="quizAnswer">
          <h5 className="quizAnswer-title">Aktivitas</h5>
          <span className="quizAnswer-item">
            {props.reqBody.activities.map((item, idx) => {
              return (
                <p key={idx}>
                  <MdCircle className="icon-circle" />{" "}
                  {item === "videoConference" ? "Video Conference" : ""}
                  {item === "surfInternet" ? "Browsing Internet" : ""}
                  {item === "watchFilm" ? "Nonton Film" : ""}
                  {item === "Microsoft Office" ? "Microsoft Office" : ""}
                  {item === "imageGraphics"
                    ? "Image Editing atau 2D Graphics Design"
                    : ""}
                  {item === "programming" ? "Programming" : ""}
                  {item === "gaming" ? "Gaming" : ""}
                  {item === "streaming" ? "Streaming to Public" : ""}
                  {item === "videoEdit" ? "Video Editing" : ""}
                  {item === "3dGraphics" ? "3D Graphics Design" : ""}
                </p>
              );
            })}
          </span>
        </div>
        <div className="quizAnswer">
          <h5 className="quizAnswer-title">Brand Laptop</h5>
          <span className="quizAnswer-item">
            {props.reqBody.brand.map((item, idx) => {
              return (
                <p key={idx}>
                  <MdCircle className="icon-circle" />{" "}
                  {item === "noPref" ? "Brand Apa Saja" : item}
                </p>
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultAnswer;

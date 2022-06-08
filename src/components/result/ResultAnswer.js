import React, { useEffect, useState } from "react";
import { MdCircle } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import { useHistory } from "react-router-dom";
import Fade from "@mui/material/Fade";
import Collapse from "@mui/material/Collapse";

const ResultAnswer = (props) => {
  const history = useHistory();
  const [editBudget, setEditBudget] = useState(false);
  let [value, setValue] = useState([12, 17]);

  function toggleEdit() {
    setEditBudget(!editBudget);
  }

  function valuetext(value) {
    return `${value} Juta`;
  }

  const handleChange = (event, newValue, activeThumb) => {
    setValue(newValue);

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - 3), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + 3)]);
    }
  };

  const handleSave = () => {
    history.replace({
      pathname: "/result",
      state: {
        ...props.reqBody,
        priceRange: `${value[0]}-${value[1]}`,
      },
    });
    history.go(0);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sliderBudget = (
    <Collapse className="budget-collapse" in={editBudget}>
      <Fade in={editBudget}>
        <div className="budget-slider">
          <div className="budget-slider-multi-range">
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
              min={0}
              max={50}
            />
            <span className="min-value">0</span>
            <span className="max-value">50</span>
          </div>
          <button onClick={handleSave} className="budget-slider-btn">
            Simpan
          </button>
        </div>
      </Fade>
    </Collapse>
  );

  useEffect(() => {
    if (props.reqBody.priceRange !== "budgetUnknown") {
      let value1 = 0;
      let value2 = 0;
      if (props.reqBody.priceRange.length === 5) {
        value1 = props.reqBody.priceRange.slice(0, 2);
        value2 = props.reqBody.priceRange.slice(3, 5);
      } else if (props.reqBody.priceRange.length === 4) {
        value1 = props.reqBody.priceRange.slice(0, 1);
        value2 = props.reqBody.priceRange.slice(2, 4);
      } else if (props.reqBody.priceRange.length === 3) {
        value1 = props.reqBody.priceRange.slice(0, 1);
        value2 = props.reqBody.priceRange.slice(2, 3);
      }
      setValue([Number(value1), Number(value2)]);
    }
  }, [props.reqBody.priceRange]);

  return (
    <div className="resultAnswer">
      <h3 className="resultAnswer-title">Jawaban Kamu</h3>
      <div className="resultAnswer-body">
        <div className="quizAnswer">
          <span className="quizAnswer-budget">
            <h5 className="quizAnswer-title">Budget </h5>
            <FaPen onClick={toggleEdit} className="icon-pen" />
          </span>
          {editBudget ? (
            <p className="quizAnswer-price">{`${value[0]}-${value[1]} Juta`}</p>
          ) : (
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
          )}
          <div className="d-none d-lg-block">{sliderBudget}</div>
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
      <div className="d-block d-lg-none">{sliderBudget}</div>
    </div>
  );
};

export default ResultAnswer;

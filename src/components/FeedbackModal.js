import React, { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { MdErrorOutline, MdSend } from "react-icons/md";
import { useSessionStorage } from "../utils";
import { FiCheckCircle } from "react-icons/fi";
import axios from "axios";

const FeedbackModal = (props) => {
  const [feedback, setFeedback] = useSessionStorage("feedback", false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [feedbackStar, setFeedbackStar] = useState(0);
  const [feedbackQuestion, setFeedbackQuestion] = useState("");
  const [feedbackError, setFeedbackError] = useState(false);

  function toggleToastFeedback() {
    setShowToast(!showToast);
  }

  function toggleFeedbackError() {
    setFeedbackError(!feedbackError);
  }

  const handleShowFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  const handleStar = (id) => {
    // Star Value
    if (feedbackStar !== id) {
      setFeedbackStar(id);
    } else {
      setFeedbackStar(0);
    }

    // Feedback Question
    switch (id) {
      case 1:
        setFeedbackQuestion(
          "Maaf kurang memuaskan, mengapa kamu kurang suka dengan rekomendasi Propicks?"
        );
        break;
      case 2:
        setFeedbackQuestion(
          "Maaf kurang memuaskan, mengapa kamu kurang suka dengan rekomendasi Propicks?"
        );
        break;
      case 3:
        setFeedbackQuestion(
          "Terima kasih! Apa yang kamu suka dan tidak suka dari rekomendasi Propicks?"
        );
        break;
      case 4:
        setFeedbackQuestion(
          "Yay! Apa yang kamu suka dan tidak suka dari rekomendasi Propicks?"
        );
        break;
      default:
        setFeedbackQuestion("");
        break;
    }
  };

  const handleSendFeedback = async (e) => {
    e.preventDefault();

    let feedback = {
      score: feedbackStar,
      message: feedbackInput,
      userPicks: props.reqBody,
    };

    try {
      await axios
        .post("https://api.propicks.id/v1/feedback", feedback)
        // .post("http://127.0.0.1:8080/v1/feedback", feedback)
        .then(() => {
          console.log("Send feedback success");
          setShowFeedback(!showFeedback);
          setFeedback(true);
          toggleToastFeedback();
        });
    } catch (error) {
      console.log(error);
      toggleFeedbackError();
    }
  };

  useEffect(() => {
    if (feedback === false && feedbackInput === "" && feedbackStar === 0) {
      setTimeout(() => {
        handleShowFeedback();
      }, 25000);
    }

    if (showToast) {
      setTimeout(() => {
        toggleToastFeedback();
      }, 4000);
    }

    if (feedbackError) {
      setTimeout(() => {
        toggleFeedbackError();
      }, 4000);
    }
  }, [showToast, feedbackError]);

  return (
    <>
      <div
        className={`feedback-container ${
          showFeedback ? "feedback-show" : "feedback-hidden"
        }`}
      >
        <div className="feedback">
          <div className="feedback-header">
            <h5 className="feedback-header-title">Give Feedback</h5>
            <HiX onClick={handleShowFeedback} className="icon-close" />
          </div>
          <div className="feedback-body">
            {feedbackError && (
              <div className="feedback-error">
                <MdErrorOutline className="icon-error" />
                <p>Mohon maaf terjadi masalah dengan feedback kami.</p>
              </div>
            )}
            <div className="feedback-review">
              <h6 className="feedback-review-title">
                Bagaimana rekomendasi Propicks menurutmu sejauh ini?
              </h6>
              <div className="feedback-review-star">
                <button
                  onClick={() => handleStar(1)}
                  className={`star-badge ${
                    feedbackStar === 1 ? "star-active" : "star-nonactive"
                  }`}
                >
                  1
                </button>
                <button
                  onClick={() => handleStar(2)}
                  className={`star-badge ${
                    feedbackStar === 2 ? "star-active" : "star-nonactive"
                  }`}
                >
                  2
                </button>
                <button
                  onClick={() => handleStar(3)}
                  className={`star-badge ${
                    feedbackStar === 3 ? "star-active" : "star-nonactive"
                  }`}
                >
                  3
                </button>
                <button
                  onClick={() => handleStar(4)}
                  className={`star-badge ${
                    feedbackStar === 4 ? "star-active" : "star-nonactive"
                  }`}
                >
                  4
                </button>
                <button
                  onClick={() => handleStar(5)}
                  className={`star-badge ${
                    feedbackStar === 5 ? "star-active" : "star-nonactive"
                  }`}
                >
                  5
                </button>
              </div>
            </div>
            <form onSubmit={handleSendFeedback}>
              {feedbackStar < 5 && feedbackStar !== 0 && (
                <div className="feedback-comments">
                  <label htmlFor="feedback">{feedbackQuestion}</label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    className="feedback-comments-input"
                    rows={4}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    value={feedbackInput}
                    placeholder="Saya suka/tidak suka karena..."
                  />
                </div>
              )}
              <div className="feedback-btn">
                <button
                  type="submit"
                  disabled={feedbackStar === 0 ? true : false}
                  className={`${
                    feedbackStar === 0 ? "btn-disabled" : "btn-active"
                  }`}
                >
                  <span>Kirim Feedback</span>
                  <MdSend className="icon-send" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`feedbackToast-container ${
          showToast ? "feedbackToast-show" : "feedbackToast-hidden"
        }`}
      >
        <div className="feedbackToast">
          <FiCheckCircle className="icon-check" />
          <h6 className="feedbackToast-title">
            Terima kasih atas feedback yang anda berikan.
          </h6>
        </div>
      </div>
    </>
  );
};

export default FeedbackModal;

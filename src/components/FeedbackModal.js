import React, { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import { useSessionStorage } from "../utils";

const FeedbackModal = () => {
  const [showFeedback, setShowFeedback] = useSessionStorage("feedback", {
    show: false,
    feedback: false,
  });
  const [feedbackInput, setFeedbackInput] = useState("");
  const [feedbackStar, setFeedbackStar] = useState(0);
  const [feedbackQuestion, setFeedbackQuestion] = useState("");

  const handleShowFeedback = () => {
    setShowFeedback({ show: !showFeedback.show, feedback: false });
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

  const handleSendFeedback = (e) => {
    e.preventDefault();

    setShowFeedback({ show: !showFeedback.show, feedback: true });
  };

  useEffect(() => {
    if (showFeedback.show === true && showFeedback.feedback === false) {
      setShowFeedback({ show: false, feedback: showFeedback.feedback });
    }

    if (showFeedback.show === false && showFeedback.feedback === false) {
      setTimeout(() => {
        setShowFeedback({
          show: !showFeedback.show,
          feedback: showFeedback.feedback,
        });
      }, 30000);
    }
  }, []);

  return (
    <div
      className={`feedback-container ${
        showFeedback.show ? "feedback-show" : "feedback-hidden"
      }`}
    >
      <div className="feedback">
        <div className="feedback-header">
          <h5 className="feedback-header-title">Give Feedback</h5>
          <HiX onClick={handleShowFeedback} className="icon-close" />
        </div>
        <div className="feedback-body">
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
                  required
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
  );
};

export default FeedbackModal;

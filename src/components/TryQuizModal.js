import React, { useEffect, useState } from "react";
import { HiX, HiChevronRight } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import tryQuizImg from "../assets/try-quiz.jpg";

const TryQuizModal = () => {
  const history = useHistory();
  const [showQuizModal, setShowQuizModal] = useState(false);

  const toggleQuizModal = () => {
    setShowQuizModal(!showQuizModal);
  };

  const handleTryQuiz = () => {
    setShowQuizModal(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.push("/play");
  };

  useEffect(() => {
    setTimeout(() => {
      toggleQuizModal();
    }, 60000);
  }, []);

  return (
    <div
      className={`tryQuiz-container ${
        showQuizModal ? "tryQuiz-show" : "tryQuiz-hidden"
      }`}
    >
      <div className="tryQuiz">
        <div className="tryQuiz-header">
          <HiX onClick={toggleQuizModal} className="tryQuiz-header-close" />
        </div>
        <div className="tryQuiz-body">
          <span className="tryQuiz-body-image">
            <img src={tryQuizImg} alt="Try Quiz" />
          </span>
          <h6 className="tryQuiz-body-title">
            Sudahkah kamu mencoba quiz Propicks?
          </h6>
          <p className="tryQuiz-body-content">
            Yuk coba quiz sekarang untuk mengetahui rekomendasi laptop dari
            Propicks
          </p>
          <button onClick={handleTryQuiz} className="tryQuiz-body-btn">
            <span className="tryQuiz-body-btn-title">Coba Quiz</span>
            <HiChevronRight className="tryQuiz-body-btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryQuizModal;

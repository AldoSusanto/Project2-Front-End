import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Menubar from "../Menubar";
import jsonQuestions from "../questions.json";
import classNames from "classnames";
import emailjs from "emailjs-com";
import { MdCheckCircleOutline } from "react-icons/md";

const Play = (props) => {
  let resultJson = {
    priceRange: "",
    pricePref: "medium",
    activities: [],
    operatingSystem: [],
    film: {
      method: "",
      hd: "",
    },
    imageGraphics: {
      software: [],
      image: {
        quality: "",
        hd: "",
      },
    },
    gaming: {
      software: [],
    },
    videoEditing: {
      software: [],
      hd: "",
    },
    threeDGraphics: {
      software: [],
    },
    size: "",
    weight: [],
    touchScreen: "",
    brand: [],
  };

  const [currentQuestion, setCurrentQuestion] = useState(jsonQuestions[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [collectedTags, setCollectedTags] = useState([]);
  const [currentSelectedTags, setCurrentSelectedTags] = useState([]);
  const [currentSelectedChoices, setCurrentSelectedChoices] = useState([]);
  const [result, setResult] = useState(resultJson);

  // Slider State
  let [minValue, setMinValue] = useState(0);
  let [maxValue, setMaxValue] = useState(8);

  // Deprecated
  const [questions, setQuestions] = useState(jsonQuestions);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [nextQuestion, setNextQuestion] = useState({});
  const [previousQuestion, setPreviousQuestion] = useState({});
  const [answer, setAnswer] = useState("");

  function disableButtonIfNeeded(nextIndex) {
    if (nextIndex > 0) {
      setIsFirstQuestion(false);
    } else {
      setIsFirstQuestion(true);
    }
  }

  function determineNextIndex(tagArray, jsonQuestions, index) {
    if (index >= jsonQuestions.length - 1) {
      return index + 1;
    }

    for (var i = index + 1; i < jsonQuestions.length; i++) {
      let currQuestion = jsonQuestions[i];
      let askIfExist = currQuestion.askIf;

      if (!askIfExist || tagArray.includes(askIfExist)) {
        // If the askIf Tag is empty, we just return the question
        return i;
      }
    }
  }

  function userAnswered(event, tagIndex) {
    var selectedTag = currentQuestion.tags[tagIndex];
    var indexAndQuestionLabel = currentQuestion.questionLabel + tagIndex;

    setCurrentSelectedTags([selectedTag]);
    setCurrentSelectedChoices([indexAndQuestionLabel]);
  }

  function userAnsweredMultiple(event, tagIndex) {
    // 1) Grab the index of the multiple choice that user just clicked, then find the tag for it
    var selectedTag = currentQuestion.tags[tagIndex];
    var tagArray = currentSelectedTags;

    //2) We check whether the tag selected already exists in our currentSelectedTags array or not. (-1 if not found)
    const tagExists = (element) => element === selectedTag;
    var findTagIndex = currentSelectedTags.findIndex(tagExists);

    if (findTagIndex >= 0) {
      // console.log(selectedTag + " has already been selected, removing element from index: " + findTagIndex);
      tagArray.splice(findTagIndex, 1);
    } else {
      tagArray = tagArray.concat(selectedTag);
    }

    // After we updated the currentSelectedTAGS array, now we update the currentSelectedCHOICES
    // CurrentSelectedChoices contains elements like: activities0, activities1
    // CurrentSelectedTags contains elements like: videoConference, watchFilm
    // The consistent naming in choices makes it easier for us to identify the selected choices.
    // Do a console.log on the choices and tags array in render func if you don't understand
    var choicesArray = currentSelectedChoices;
    var indexAndQuestionLabel = currentQuestion.questionLabel + tagIndex;
    const choiceExists = (element) => element === indexAndQuestionLabel;
    var findChoicesIndex = choicesArray.findIndex(choiceExists); // We check whether the choice selected already exists in our array or not. (-1 if not found)

    if (findChoicesIndex >= 0) {
      choicesArray.splice(findChoicesIndex, 1);
    } else {
      choicesArray = choicesArray.concat(indexAndQuestionLabel);
    }

    setCurrentSelectedTags([...tagArray]);
    setCurrentSelectedChoices([...choicesArray]);
  }

  function mapAnswerToResult(questionLabel, selectedTag) {
    var currResult = result;

    if (questionLabel === "priceRange") {
      currResult.priceRange = selectedTag;
    }

    if (questionLabel === "pricePref") {
      currResult.pricePref = selectedTag;
    }

    if (questionLabel === "activities") {
      currResult.activities = currResult.activities.concat(selectedTag);
    }

    if (questionLabel === "filmMethod") {
      currResult.film.method = selectedTag;
    }

    if (questionLabel === "filmHd") {
      currResult.film.hd = selectedTag;
    }

    if (questionLabel === "imageGraphicsSoftware") {
      currResult.imageGraphics.software =
        currResult.imageGraphics.software.concat(selectedTag);
    }

    if (questionLabel === "imageGraphicsImageQuality") {
      currResult.imageGraphics.image.quality = selectedTag;
    }

    if (questionLabel === "imageGraphicsImageHD") {
      currResult.imageGraphics.image.hd = selectedTag;
    }

    if (questionLabel === "gamingSoftware") {
      currResult.gaming.software =
        currResult.gaming.software.concat(selectedTag);
    }

    if (questionLabel === "videoEditingSoftware") {
      currResult.videoEditing.software =
        currResult.videoEditing.software.concat(selectedTag);
    }

    if (questionLabel === "videoEditingHd") {
      currResult.videoEditing.hd = selectedTag;
    }

    if (questionLabel === "3dGraphicsSoftware") {
      currResult.threeDGraphics.software =
        currResult.threeDGraphics.software.concat(selectedTag);
    }

    if (questionLabel === "size") {
      currResult.size = selectedTag;
    }

    if (questionLabel === "weightOne") {
      currResult.weight = currResult.weight.concat(selectedTag);
    }

    if (questionLabel === "weightTwo") {
      currResult.weight = currResult.weight.concat(selectedTag);
    }

    if (questionLabel === "brand") {
      currResult.brand = currResult.brand.concat(selectedTag);
    }

    setResult(currResult);
  }

  function sendEmail() {
    var emailBody = {
      result: JSON.stringify(result, null, "\t"),
    };

    emailjs
      .send(
        "service_g809v3k",
        "template_tvaokcm",
        emailBody,
        "user_oSPyVlq4AURjfm7xfmjl3"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  const handleNext = () => {
    //1) Gather the choices that user has selected
    var tagArray = collectedTags.concat(currentSelectedTags);
    //1.5) Check whether user has selected a choice

    var nextIndex = determineNextIndex(
      tagArray,
      jsonQuestions,
      currentQuestionIndex
    );

    var currentTagList = currentSelectedTags;
    var questionLabel = currentQuestion.questionLabel;

    //2) For each of the choices, map them to the correct result
    for (const [_, value] of currentTagList.entries()) {
      mapAnswerToResult(questionLabel, value);
    }

    //3) Move on to the next question and refresh the "currentSelectedTags" variable
    if (currentQuestionIndex < jsonQuestions.length - 1) {
      setCurrentQuestion(jsonQuestions[nextIndex]);
      setCurrentQuestionIndex(nextIndex);
      setCollectedTags(tagArray);
      setCurrentSelectedTags([]);
    } else {
      // 4) If we reached the end of questions list, we show the result page
      console.log(JSON.stringify(result));
      sendEmail();
      props.history.push({
        pathname: "/result",
        state: result,
      });
    }
    // console.log("CollectedTags: " + JSON.stringify(tagArray));
    disableButtonIfNeeded(currentQuestionIndex + 1);
  };

  function handleMaxValue(e) {
    let lowerSlider = document.querySelector("#lower");
    setMaxValue(parseInt(e.target.value));

    if (maxValue === minValue + 3) {
      if (minValue == lowerSlider.min) {
        setMaxValue(parseInt(lowerSlider.min) + 3);
      }

      setMinValue(minValue - 1);
    }
    if (minValue < lowerSlider.min) {
      setMinValue(parseInt(lowerSlider.min));
    }

    setCurrentSelectedTags([minValue + "-" + e.target.value]);
    setCurrentSelectedChoices([currentQuestion.questionLabel + 1]);
  }

  function handleMinValue(e) {
    let upperSlider = document.querySelector("#upper");
    setMinValue(parseInt(e.target.value));

    if (minValue === maxValue - 3) {
      if (maxValue == upperSlider.max) {
        setMinValue(parseInt(upperSlider.max) - 3);
      }

      setMaxValue(maxValue + 1);
    }
    if (maxValue > upperSlider.max) {
      setMaxValue(parseInt(upperSlider.max));
    }

    setCurrentSelectedTags([e.target.value + "-" + maxValue]);
    setCurrentSelectedChoices([currentQuestion.questionLabel + 1]);
  }

  useEffect(() => {
    setCurrentQuestion(jsonQuestions[currentQuestionIndex]);
    setAnswer(jsonQuestions[currentQuestionIndex].answer);
  }, [currentQuestionIndex]);

  return (
    <Fragment>
      <Helmet>
        <title>ProPicks - Laptop Quiz</title>
      </Helmet>
      <Menubar />
      <div className="quiz-body">
        <div className="questions">
          <h5>
            {currentQuestion.question}
            <br />
            {currentQuestion.isMultiple && (
              <span className="questions-multiple">Pilih Multiple</span>
            )}
          </h5>

          {!currentQuestion.isMultiple ? (
            <>
              {!currentQuestion.isSlider ? (
                currentQuestion.options.map((option, i) => {
                  let optionSelected = currentSelectedChoices.includes(
                    currentQuestion.questionLabel + i
                  );

                  return (
                    <div key={i} className="options-container">
                      <p
                        onClick={(e) => userAnswered(e, i)}
                        className={
                          optionSelected ? "option selected" : "option"
                        }
                      >
                        {option}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="slider">
                  <span className="multi-range">
                    <input
                      onChange={(e) => handleMinValue(e)}
                      type="range"
                      min="0"
                      max="40"
                      value={minValue}
                      id="lower"
                    />
                    <input
                      onChange={(e) => handleMaxValue(e)}
                      type="range"
                      min="0"
                      max="40"
                      value={maxValue}
                      id="upper"
                    />
                    <span className="min-value">{minValue}</span>
                    <span className="max-value">{maxValue}</span>
                  </span>
                  <span className="range-price">
                    <h5>{`${minValue} - ${maxValue} Juta`}</h5>
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              {currentQuestion.options.map((option, i) => {
                let optionSelected = currentSelectedChoices.includes(
                  currentQuestion.questionLabel + i
                );

                return (
                  <div key={i} className="options-container">
                    <p
                      key={option[i]}
                      onClick={(e) => userAnsweredMultiple(e, i)}
                      className={
                        optionSelected
                          ? "option-multiple selected"
                          : "option-multiple"
                      }
                    >
                      <span
                        className={optionSelected ? "icon-check" : "d-none"}
                      >
                        <MdCheckCircleOutline />
                      </span>
                      {option}
                    </p>
                  </div>
                );
              })}
            </>
          )}
          <div className="button-container d-flex justify-content-center justify-content-md-start">
            <button
              id="next-button"
              onClick={handleNext}
              className={classNames(
                "",
                currentSelectedTags.length === 0 && "disable"
              )}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Play;

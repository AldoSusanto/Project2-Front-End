import React, { Component } from 'react';
import {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import jsonQuestions from '../questions.json';
import classNames from 'classnames';

class Play extends Component {

    resultJson = {
        priceRange: "",
        pricePref: "medium",
        activities: [ ],
        operatingSystem: [],
        film: {
            method: "",
            hd: ""
        },
        imageGraphics: {
            software: [],
            image: {
                quality: "",
                hd: ""
            }
        },
        gaming: {
            software: []
        },
        videoEditing: {
            software: [],
            hd: ""
        },
        threeDGraphics:{
            software: []
        },
        size: "",
        weight: [],
        touchScreen: "",
        brand:[]
    }

    constructor(props){
        super(props);
        this.state = {
            questions: jsonQuestions,
            currentQuestion: jsonQuestions[0],
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            currentQuestionIndex: 0,
            isFirstQuestion: true,
            isLastQuestion: false,
            collectedTags: [],
            currentSelectedTags: [],
            currentSelectedChoices: [],
            result: this.resultJson 
        }

        this.userAnswered = this.userAnswered.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    render() {
        const { currentQuestion } = this.state;

        const choices = this.generateOptions(currentQuestion);
        

        return (
            <Fragment>
                <Helmet><title>Play</title></Helmet>
                <div className="questions">
                    <h5>{currentQuestion.question}</h5>

                    {choices}
                    <div className="button-container">
                        <button 
                            id="prev-button"
                            onClick={this.buttonClick}
                            className= {classNames('', {'disable': true})}>
                            Previous
                        </button>
                        <button
                            id="next-button"
                            onClick={this.buttonClick}
                            className= {classNames('', {'disable': !currentQuestion.isMultiple})}>
                            Next
                        </button>
                        <span className= {classNames('', {'disable-span': !this.state.isLastQuestion})}>
                            <p>Hore !! Ini pertanyaan terakhir untuk kamu</p>
                        </span>
                        
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        const { currentQuestionIndex } = this.state;

        this.setState({
            currentQuestion: jsonQuestions[currentQuestionIndex],
            answer: jsonQuestions[currentQuestionIndex].answer
        })        
    }

    disableButtonIfNeeded(nextIndex){

        if(nextIndex > 0){
            this.setState({
                isFirstQuestion: false
            })
        }else{
            this.setState({
                isFirstQuestion: true
            })           
        }

        if(nextIndex >= jsonQuestions.length-1){
            this.setState({
                isLastQuestion: true
            })
        }else{
            this.setState({
                isLastQuestion: false
            })
        }
    }

    buttonClick(event){
        var index = this.state.currentQuestionIndex;

        switch(event.target.id){
            case "prev-button":
                if(index > 0){
                    this.setState({
                        currentQuestion :jsonQuestions[index - 1],
                        currentQuestionIndex: index - 1
                    })
                }
                this.disableButtonIfNeeded(index-1)
                break;
            case "next-button":
                var tagArray = this.state.collectedTags.concat(this.state.currentSelectedTags); 
                var nextIndex = this.determineNextIndex(tagArray, jsonQuestions, index);

                var currentTagList = this.state.currentSelectedTags;
                var questionLabel = this.state.currentQuestion.questionLabel;
                for(const [index, value] of currentTagList.entries()){
                    console.log("value " + value );
                    this.mapAnswerToResult(questionLabel, value);
                }

                if(index < jsonQuestions.length-1){
                    this.setState({
                        currentQuestion :jsonQuestions[nextIndex],
                        currentQuestionIndex: nextIndex,
                        collectedTags: tagArray,
                        currentSelectedTags: []
                    })
                }else{
                    alert("We are done !")
                    console.log(JSON.stringify(this.state.result));
                    this.props.history.push('/result');
                }
                console.log("collected Tags: " + tagArray);
                this.disableButtonIfNeeded(index+1)
                break;
            default:
                console.log("A button is clicked, but the ID is unidentified " + event.target.id)
                break;
        }
    }

    determineNextIndex(tagArray, jsonQuestions, index){
        if (index >= jsonQuestions.length - 1){
            return index+1;
        }

        for(var i = index+1 ; i < jsonQuestions.length ; i++){
            let currQuestion = jsonQuestions[i];
            let askIfExist = currQuestion.askIf;

            if(!askIfExist){ // If the askIf Tag is empty, we just return the question
                console.log("AskIf Indicator: " + askIfExist);
                return i;
            } 

            if(tagArray.includes(askIfExist)){
                console.log("AskIf Indicator: " + askIfExist);
                return i;
            }

        }
    }

    generateOptions(currentQuestion){
        var choices = [];

        let questions = currentQuestion.options;

        if(!currentQuestion.isMultiple){
            for (var i = 0 ; i < questions.length ; i = i+2){
                if( i + 1 < questions.length ){
                    let q1 = i;
                    let q2 = i+1;
    
                    choices.push(
                        <div key={i} className="options-container">
                            <p key={questions[i]} onClick={(e) => this.userAnswered(e, q1)} className="option">{questions[i]}</p>
                            <p key={questions[i+1]} onClick={(e) => this.userAnswered(e, q2)} className="option">{questions[i+1]}</p>
                        </div>
                    )
                }else{
                    let q1 = i;
                    choices.push(
                        <div key= {i} className="options-container">
                            <p key={questions[i]} onClick={(e) => this.userAnswered(e, q1)} className="option">{questions[i]}</p>
                        </div>
                    )
                }
            }
        }else{
            for (i = 0 ; i < questions.length ; i = i+2){
                if( i + 1 < questions.length ){
                    let q1 = i;
                    let q2 = i+1;

                    let q1Selected = this.state.currentSelectedChoices.includes(currentQuestion.questionLabel + q1);
                    let q2Selected = this.state.currentSelectedChoices.includes(currentQuestion.questionLabel + q2);
    
                    choices.push(
                        <div key={i} className="options-container">
                            <p key={questions[i]} onClick={(e) => this.userAnsweredMultiple(e, q1)} className={q1Selected ? "option-multiple selected" : "option-multiple"}>{questions[i]}</p>
                            <p key={questions[i+1]} onClick={(e) => this.userAnsweredMultiple(e, q2)} className={q2Selected ? "option-multiple selected" : "option-multiple"}>{questions[i+1]}</p>
                        </div>
                    )
                }else{
                    let q1 = i;
                    let q1Selected = this.state.currentSelectedChoices.includes(currentQuestion.questionLabel + q1);
                    
                    choices.push(
                        <div key= {i} className="options-container">
                            <p key={questions[i]} onClick={(e) => this.userAnsweredMultiple(e, q1)} className={q1Selected ? "option-multiple selected" : "option-multiple"}>{questions[i]}</p>
                        </div>
                    )
                }
            }
        }

        return choices;
    }

    userAnswered(event, tagIndex) {
        var index = this.state.currentQuestionIndex;
        var selectedTag = this.state.currentQuestion.tags[tagIndex];
        var tagArray = this.state.collectedTags.concat(selectedTag);

        var nextIndex = this.determineNextIndex(tagArray, jsonQuestions, index);

        var questionLabel = this.state.currentQuestion.questionLabel;

        console.log("Question Label: " + questionLabel);
        this.mapAnswerToResult(questionLabel, selectedTag);

        if(nextIndex < jsonQuestions.length){
            this.setState({
                currentQuestion :jsonQuestions[nextIndex],
                currentQuestionIndex: nextIndex,
                collectedTags: tagArray
            })
        }else{
            alert("We are done !")
            console.log(JSON.stringify(this.state.result));
            this.props.history.push('/result');
        }

        console.log("collected Tags: " + tagArray);
        this.disableButtonIfNeeded(nextIndex)
    }

    userAnsweredMultiple(event, tagIndex) {
        // Update the tags array
        var selectedTag = this.state.currentQuestion.tags[tagIndex];
        var tagArray = this.state.currentSelectedTags;

        const tagExists = (element) => element === selectedTag;
        var findTagIndex = tagArray.findIndex(tagExists) // We check whether the tag selected already exists in our array or not. (-1 if not found)

        if(findTagIndex >= 0 ){
            console.log(selectedTag + " has already been selected, removing element from index: " + findTagIndex);
            tagArray.splice(findTagIndex, 1)
        }else{
            tagArray = tagArray.concat(selectedTag);
        }
        
        console.log("Array tags: " + tagArray);

        // Update the choices array
        var choicesArray= this.state.currentSelectedChoices;
        var indexAndQuestionLabel = this.state.currentQuestion.questionLabel + tagIndex;
        const choiceExists = (element) => element === indexAndQuestionLabel;
        var findChoicesIndex = choicesArray.findIndex(choiceExists) // We check whether the choice selected already exists in our array or not. (-1 if not found)
        
        if(findChoicesIndex >= 0){
            console.log(indexAndQuestionLabel + " has already been selected, removing element from index: " + findChoicesIndex);
            choicesArray.splice(findChoicesIndex, 1)
        }else{
            choicesArray = choicesArray.concat(indexAndQuestionLabel);
        }

        this.setState({
            currentSelectedTags: tagArray,
            currentSelectedChoices: choicesArray
        })
    }

    mapAnswerToResult(questionLabel, selectedTag){
        var currResult = this.state.result;

        if(questionLabel === "priceRange"){
            currResult.priceRange = selectedTag;
        }

        if(questionLabel === "pricePref"){
            currResult.pricePref = selectedTag;
        }

        if(questionLabel === "activities"){
            currResult.activities = currResult.activities.concat(selectedTag);
        }

        if(questionLabel === "filmMethod"){
            currResult.film.method = selectedTag;
        }

        if(questionLabel === "filmHd"){
            currResult.film.hd = selectedTag;
        }

        if(questionLabel === "imageGraphicsSoftware"){
            currResult.imageGraphics.software = currResult.imageGraphics.software.concat(selectedTag);
        }

        if(questionLabel === "imageGraphicsImageQuality"){
            currResult.imageGraphics.image.quality = selectedTag;
        }

        if(questionLabel === "imageGraphicsImageHD"){
            currResult.imageGraphics.image.hd = selectedTag;
        }

        if(questionLabel === "gamingSoftware"){
            currResult.gaming.software = currResult.gaming.software.concat(selectedTag);
        }

        if(questionLabel === "videoEditingSoftware"){
            currResult.videoEditing.software = currResult.videoEditing.software.concat(selectedTag);
        }
        
        if(questionLabel === "videoEditingHd"){
            currResult.videoEditing.hd = selectedTag;
        }

        if(questionLabel === "3dGraphicsSoftware"){
            currResult.threeDGraphics.software = currResult.threeDGraphics.software.concat(selectedTag);
        }

        if(questionLabel === "size"){
            currResult.size = selectedTag;
        }

        if(questionLabel === "weight"){
            currResult.weight = currResult.weight.concat(selectedTag);
        }

        if(questionLabel === "brand"){
            currResult.brand = currResult.brand.concat(selectedTag);
        }

        this.setState({
            result: currResult
        })
        
    }

}



export default Play;
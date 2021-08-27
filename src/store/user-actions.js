import { shuffleArray } from "../customFunctions";
import { userSliceActions } from "./user-slice"


export const fetchQuestions = (topic) => {

    let topicCode = undefined;
    switch (topic) {
        case 'General Knowledge': topicCode = 9; break;
        case 'Animals': topicCode = 27; break;
        case 'Sports': topicCode = 21; break;
        case 'Politics': topicCode = 24; break;
        case 'Vehicles': topicCode = 28; break;
        case 'Computers': topicCode = 18; break;
        default: alert('Incorrect Topic Chosen'); return;
    }

    return (dispatch) => {

        dispatch(userSliceActions.setIsLoading({ isLoading: true }))
        const fetchQuestion = async () => {
            const questionsList = [];

            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${topicCode}&difficulty=medium&type=multiple&encode=base64`)
            const data = await response.json();
            dispatch(userSliceActions.setIsLoading({ isLoading: false }))

            for (let item of data.results) {

                let choices = [...item.incorrect_answers.map(ans => window.atob(ans)), window.atob(item.correct_answer)]


                const newQues = {
                    ques: window.atob(item.question),
                    answer: window.atob(item.correct_answer),
                    choices: shuffleArray(choices)
                }
                questionsList.push(newQues)
            }

            let shuffledList = shuffleArray(questionsList);
            shuffledList.forEach(item => {
                item.choices = shuffleArray(item.choices)
            })
            dispatch(userSliceActions.setQuestions({ questionSet: shuffledList }))


        }

        try {
            fetchQuestion()
        } catch (err) {
            console.log(err)
        }
    }
}
import { userSliceActions } from "./user-slice"


export const fetchQuestions = (topic) => {

    let topicCode = undefined;
    switch (topic) {
        case 'gk': topicCode = 9; break;
        case 'animals': topicCode = 27; break;
        case 'sports': topicCode = 21; break;
        case 'politics': topicCode = 24; break;
        case 'vehicles': topicCode = 28; break;
        case 'computers': topicCode = 18; break;
        default: alert('Incorrect Topic Chosen'); return; break;
    }

    return (dispatch) => {

        dispatch(userSliceActions.setIsLoading({ isLoading: true }))
        const fetchQuestion = async () => {
            const questionsList = [];

            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${topicCode}&difficulty=medium&type=multiple&encode=base64`)
            const data = await response.json();
            dispatch(userSliceActions.setIsLoading({ isLoading: false }))

            for (let item of data.results) {

                const choices = [...item.incorrect_answers.map(ans => window.atob(ans)), window.atob(item.correct_answer)]

                console.log(choices)

                const newQues = {
                    ques: window.atob(item.question),
                    answer: window.atob(item.correct_answer),
                    choices
                }
                questionsList.push(newQues)
            }
            dispatch(userSliceActions.setQuestions({ questionSet: questionsList }))


        }

        try {
            fetchQuestion()
        } catch (err) {
            console.log(err)
        }
    }
}
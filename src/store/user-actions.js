import { userSliceActions } from "./user-slice"


export const fetchQuestions = () => {

    return (dispatch) => {
        dispatch(userSliceActions.setIsLoading({ isLoading: true }))
        const fetchQuestion = async () => {
            const questionsList = []

            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple&encode=base64`)
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
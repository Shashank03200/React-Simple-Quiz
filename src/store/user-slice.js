import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'User Slice',
    initialState: {
        name: undefined,
        topic: undefined,
        questions: undefined,
        reponses: [],
        isQuizRunning: false,
        loading: false,
        negativeScoreAllowed: true
    },
    reducers: {

        setIsLoading(state, action) {
            state.loading = action.payload.isLoading
        },
        setQuestions(state, action) {
            state.questions = action.payload.questionSet;
            state.responses = new Array(10).fill(-1)
            state.quizRunning = true;
        },
        setUser(state, action) {
            state.name = action.payload.name;
            state.topic = action.payload.topic
            state.negativeScoreAllowed = action.payload.negativeScoreAllowed;
        },
        resetQuiz(state) {
            state.name = undefined;
            state.questions = undefined;
            state.responses = [];
        },
        toggleNegativeMarking(state) {
            state.negativeScoreAllowed = !state.negativeScoreAllowed;
        },
        setResponse(state, action) {
            state.responses[action.payload.currentProblemIndex] = action.payload.response;
        },
        clearAllResponses(state) {
            state.responses = new Array(10).fill(-1);
        },
        setQuizState(state, action) {
            state.isQuizRunning = action.payload
        }

    }
})

export const userSliceActions = userSlice.actions;

const store = configureStore({ reducer: userSlice.reducer })

export default store;
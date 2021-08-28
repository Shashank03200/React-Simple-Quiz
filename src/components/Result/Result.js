import { Container, Box, Heading, Text, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Demo from "../ReviewWindow/ReviewWindow";

import showWarningOnExit from "../../customFunctions";
import { userSliceActions } from "../../store/user-slice";
import Error from "../Error/Error";


const Result = (props) => {



    useEffect(() => {
        window.removeEventListener('beforeunload', showWarningOnExit);
    }, [])



    useEffect(() => {
        try{
            window.addEventListener('focus', toggleReviewWindowHandler);
        }catch(err){
            window.location.href = "/";
        }
        
    }, [])

    const [review, setReview] = useState(false)

    const dispatch = useDispatch();


    const name = useSelector(state => state.name)
    const topic = useSelector(state => state.topic)
    const responses = useSelector(state => state.responses);
    const problems = useSelector(state => state.questions);
    const isNegativeScoreAllowed = useSelector(state => state.negativeScoreAllowed);

    if (responses === undefined) {
        return <Error />
    }


    let unattempted = 0, correct = 0, incorrect = 0;
    let score = 0;
    for (let i = 0; i < responses.length; i++) {

        if (responses[i] === -1) {
            unattempted++;
        } else if (responses[i] === problems[i].answer) {
            correct++;
            score += 10;
        } else if (responses[i] !== problems[i].answer) {
            incorrect++;
            if (isNegativeScoreAllowed) {
                score -= 5;
            }
        }
    }
    const restartQuiz = () => {
        dispatch(userSliceActions.clearAllResponses());
        dispatch(userSliceActions.setQuizState(true))
    }

    const menuLinkHandler = () => {
        window.location.href = "/"
    }

    const toggleReviewWindowHandler = () => {
        setReview(prevState => !prevState);
    }



    return (
        <Container padding={{ base: "10px", md: "30px", lg: "40px" }} mt={{ base: "20px", md: "20px", lg: "10px" }} textAlign="center" border="1px" borderColor="gray.300" borderRadius="lg">
            <Box fontSize="2rem" color="#512D6D" my={{ base: "30px", md: "30px" }}>
                Dear {name}
            </Box>
            <Box><Heading as="h2" fontSize="3xl" mb="40px" color="gray.600">Quiz Completed</Heading></Box>

            <Box d="flex" justifyContent="space-evenly"><Heading as="h3" fontSize="3xl" d="inline" justify="center">Your Score: </Heading><Heading d="inline" as="h3" fontSize="3xl" color="teal">{score} / 100</Heading></Box>


            <Box mt="40px">
                <Text fontSize="xl">Correct Response: {correct}</Text>
                <Text fontSize="xl">Incorrect Response: {incorrect}</Text>
                <Text fontSize="xl">Unattempted Problems: {unattempted} </Text>
                <Box mt="100px">
                    <Box d="flex" justifyContent="space-between" padding="20px">
                        <Button colorScheme="teal" size="md" className="reviewBtn" onClick={toggleReviewWindowHandler}>Review Responses</Button>
                        <Button colorScheme="teal" size="md" className="menuDirectBtn" onClick={menuLinkHandler}>Main Menu</Button>
                    </Box>

                    <Box padding="24px">
                        <Button colorScheme="teal" size="lg" className="restartBtn" onClick={restartQuiz}>Restart</Button>
                    </Box>

                </Box>
            </Box>

            {review && < Demo title='Quiz Results' name={name} responses={responses} topic={topic} problems={problems} onExit={toggleReviewWindowHandler} score={score} />}
        </Container >
    );
}

export default Result;
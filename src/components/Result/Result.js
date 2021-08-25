import { Container, Box, Heading, Text, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router";
import showWarningOnExit from "../../customFunctions";
import { userSliceActions } from "../../store/user-slice";


const Result = (props) => {

    const history = useHistory();

    useEffect(() => {

        window.removeEventListener('beforeunload', showWarningOnExit);
    }, [])

    const dispatch = useDispatch();


    const responses = useSelector(state => state.responses);
    const problems = useSelector(state => state.questions);
    const isNegativeScoreAllowed = useSelector(state => state.negativeScoreAllowed);

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
        dispatch(userSliceActions.resetQuiz());
        window.location.href = "/"
        // history.replace('/');
    }


    return (
        <Container padding={{ base: "10px", md: "30px", lg: "40px" }} my={{ base: "30px", md: "50px", lg: "130px" }} textAlign="center" border="1px" borderColor="gray.300" borderRadius="lg">
            <Box><Heading as="h2" fontSize="5xl" mb="40px">Quiz Completed</Heading></Box>

            <Box d="flex" justifyContent="space-evenly"><Heading as="h3" fontSize="3xl" d="inline" justify="center">Your Score: </Heading><Heading d="inline" as="h3" fontSize="3xl" color="teal">{score} / 100</Heading></Box>

            <Box mt="40px">
                <Text fontSize="xl">Correct Response: {correct}</Text>
                <Text fontSize="xl">Incorrect Response: {incorrect}</Text>
                <Text fontSize="xl">Unattempted Problems: {unattempted} </Text>
                <Box mt="100px">
                    <Box d="flex" justifyContent="space-between" padding="20px">
                        <Button colorScheme="teal" size="md" className="reviewBtn">Review Responses</Button>
                        <Button colorScheme="teal" size="md" className="menuDirectBtn" onClick={menuLinkHandler}>Main Menu</Button>
                    </Box>

                    <Box padding="24px">
                        <Button colorScheme="teal" size="lg" className="restartBtn" onClick={restartQuiz}>Restart</Button>
                    </Box>

                </Box>
            </Box>

        </Container >
    );
}

export default Result;
import { Container, Box, Text, Grid, RadioGroup, Radio, propNames } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { userSliceActions } from "../../store/user-slice";

const Problem = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener("beforeunload", (event) => {
            event.returnValue = "Reloading this page can cause exceptions and can result in failure.\nDo you wish to continue?"
        });
    }, [])

    useEffect(() => {
        window.addEventListener("onunload", (event) => {
            console.log('Unloading')
            history.replace('/')
        })
    }, [])


    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const problems = useSelector(state => state.questions);
    const responses = useSelector(state => state.responses);

    const currentQuestion = problems[currentProblemIndex].ques;
    const currentChoices = problems[currentProblemIndex].choices;

    const nextProblem = () => {
        setCurrentProblemIndex(prevValue => prevValue + 1)
    }

    const previousProblem = () => {
        setCurrentProblemIndex(prevValue => prevValue - 1)
    }

    const markResponse = (response) => {
        dispatch(userSliceActions.setResponse({ currentProblemIndex, response }))
    }

    const submitTestHandler = () => {
        dispatch(userSliceActions.setQuizState(false))
    }

    return (
        <>

            <Box mt={{ base: "20px", md: "100px", lg: "200px" }} width={{ base: "100%", md: "80%", lg: "90%" }} mx="auto" borderWidth="2px" p="30px" borderRadius="lg">
                <Box borderRadius="lg" p="10px">
                    <Text fontSize="3xl">{currentQuestion}</Text>
                </Box>
                <RadioGroup name={"problem" + setCurrentProblemIndex} onChange={markResponse} value={responses[currentProblemIndex]}>
                    <Grid templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2, 1fr)" }} gap={6} mt={{ base: "20px", md: "40px", lg: "40px" }}>

                        {
                            currentChoices.map((choice, index) => {


                                return (
                                    <Box borderWidth="2px" borderRadius="md" pl="40px" >
                                        <Radio colorScheme="green" name={"problem" + setCurrentProblemIndex} value={choice} isFullWidth>
                                            <Text fontSize="xl" padding={["5px", "8px", "10px"]} >{choice}</Text>
                                        </Radio>
                                    </Box>
                                )
                            })
                        }

                    </Grid>
                </RadioGroup>
            </Box>
            <Box d="flex" justifyContent="space-around" mt="40px">
                <Button colorScheme="teal" size="lg" variant="outline" onClick={submitTestHandler}>
                    Submit Test
                </Button>
                <Button colorScheme="teal" size="lg" variant="solid" onClick={previousProblem} isDisabled={currentProblemIndex === 0 ? true : false}>
                    Previous
                </Button>
                <Button colorScheme="teal" size="lg" variant="solid" onClick={nextProblem} isDisabled={currentProblemIndex === 9 ? true : false}>
                    Next
                </Button>
            </Box>
        </>

    );
}

export default Problem;
import { Container, Box, Text, Grid, RadioGroup, Radio, propNames } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"
import showWarningOnExit from "../../customFunctions";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { shuffleArray } from '../../customFunctions'
import { userSliceActions } from "../../store/user-slice";

const Problem = (props) => {


    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener("beforeunload", showWarningOnExit);
    }, [])

    useEffect(() => {
        window.addEventListener("onunload", (event) => {
            console.log('Unloading')
        })
    }, [])


    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    let problems = useSelector(state => state.questions);
    const responses = useSelector(state => state.responses);



    let shuffledProblems = [];
    if (problems !== undefined) {
        shuffledProblems = shuffleArray([...problems])

    }

    const currentQuestion = shuffledProblems[currentProblemIndex].ques;
    const currentChoices = shuffleArray(problems[currentProblemIndex].choices);

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
                    <Text fontSize={["xl", "3xl", "3xl", "3xl"]}>{currentQuestion}</Text>
                </Box>
                <RadioGroup name={"problem" + setCurrentProblemIndex} onChange={markResponse} value={responses[currentProblemIndex]}>
                    <Grid templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2, 1fr)" }} gap={6} mt={{ base: "20px", md: "40px", lg: "40px" }}>

                        {
                            currentChoices.map((choice, index) => {


                                return (
                                    <Box borderWidth="2px" borderRadius="md" pl="40px" >
                                        <Radio colorScheme="green" name={"problem" + setCurrentProblemIndex} value={choice} isFullWidth >
                                            <Text fontSize={["lg"]} padding={["5px", "8px", "10px"]} >{choice}</Text>
                                        </Radio>
                                    </Box>
                                )
                            })
                        }

                    </Grid>
                </RadioGroup>
            </Box>
            <Box d={{ sm: 'block', md: 'flex' }} justifyContent={{ md: 'space-around' }} mt="40px">
                <Box d="flex" p={["10px", "20px"]} justifyContent="space-between" w={{ md: '50%' }}>
                    <Button colorScheme="teal" className="prevBtn" variant="solid" onClick={previousProblem} isDisabled={currentProblemIndex === 0 ? true : false}>
                        Previous
                    </Button>
                    <Button colorScheme="teal" className="nextBtn" variant="solid" onClick={nextProblem} isDisabled={currentProblemIndex === 9 ? true : false}>
                        Next
                    </Button>
                </Box>
                <Box d="flex" justifyContent="center" px={["10px", "20px"]} py={["20px", "20px"]}>
                    <Button colorScheme="teal" className="submitQuizBtn" variant="outline" onClick={submitTestHandler}>
                        Submit Test
                    </Button>
                </Box>

            </Box>
        </>

    );
}

export default Problem;
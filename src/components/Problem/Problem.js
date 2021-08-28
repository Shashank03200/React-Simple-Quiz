import { Box, Text, Grid, RadioGroup, Radio } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"
import showWarningOnExit from "../../customFunctions";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


import { userSliceActions } from "../../store/user-slice";
import Error from "../Error/Error";



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

    if (problems === undefined) {
        return <Error />
    }

    const currentChoices = problems[currentProblemIndex].choices;

    const currentQuestion = problems[currentProblemIndex].ques;


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

            <Box shadow="md" position="relative" minHeight={{ base: "450px", md: "500px", lg: "auto" }} mt={{ md: "60px", lg: "160px" }} width={{ base: "100%", md: "80%", lg: "90%" }} mx="auto" borderWidth="2px" p="30px" borderRadius="lg">
                <Box borderRadius="lg" p="10px">
                    <Text fontSize={{ base: '14px', md: '22px', lg: '26px' }}>{currentQuestion}</Text>
                </Box>
                <RadioGroup position={{ base: "absolute", md: "relative" }} bottom={{ base: "20px", md: "auto" }} name={"problem" + setCurrentProblemIndex} onChange={markResponse} value={responses[currentProblemIndex]}>
                    <Grid templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2, 1fr)" }} gap={6} mt={{ base: "20px", md: "40px", lg: "40px" }}>

                        {
                            currentChoices.map((choice, index) => {


                                return (
                                    <Box key={index} borderWidth="2px" borderRadius="md" pl={{ base: '10px', md: '12px', lg: '40px' }} >
                                        <Radio colorScheme="green" name={"problem" + setCurrentProblemIndex} value={choice} isFullWidth >
                                            <Text fontSize={{ base: '16px', md: '20px', lg: '20px' }} padding={["5px", "8px", "10px"]} >{choice}</Text>
                                        </Radio>
                                    </Box>
                                )
                            })
                        }

                    </Grid>
                </RadioGroup>
            </Box>
            <Box d={{ sm: 'block', md: 'flex' }} justifyContent={{ md: 'space-around' }} mt="40px" borderWidth="2px">
                <Box d="flex" p={["10px", "20px"]} justifyContent="space-between" w={{ md: '50%' }} >
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
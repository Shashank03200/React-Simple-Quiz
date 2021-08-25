import { Button, Center, Box, Input, Select, Checkbox, FormControl, IconButton, Icon } from "@chakra-ui/react"
import React, { useState, useRef, useEffect } from "react";

import './Welcome.css'

import { useDispatch, useSelector } from "react-redux";

import { userSliceActions } from "../../store/user-slice";
import { fetchQuestions } from "../../store/user-actions";
import { Container, Heading } from "@chakra-ui/react"

import { useHistory } from "react-router";
import { MoonIcon } from "@chakra-ui/icons";


const Welcome = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const isLoading = useSelector(state => state.loading);
    const questions = useSelector(state => state.questions);
    const negativeCheck = useSelector(state => state.negativeScoreAllowed)

    console.log(negativeCheck)

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(true);
    const [nameIsTouched, setNameIsTouched] = useState(false)


    const topicRef = useRef()
    const negativeRef = useRef();

    useEffect(() => {
        dispatch(userSliceActions.setQuizState(false))
    }, [])

    useEffect(() => {
        if (name === '' && nameIsTouched) {
            setNameError(true);

        } else {
            setNameError(false)
        }
    }, [name, nameIsTouched])

    const nameChangeHandler = (event) => {

        setName((prevState) => {
            return event.target.value
        })
        setNameIsTouched(true)
    }

    const checkboxToggleHandler = () => {
        dispatch(userSliceActions.toggleNegativeMarking(negativeRef.current.checked))
    }

    const setUserHandler = (event) => {

        event.preventDefault()
        setNameIsTouched(true)
        if (name === '') {
            // alert('Enter your valid name')
            return;
        }
        const topic = topicRef.current.value;

        if (topic === '') {
            alert('Please select a topic to continue.');
            return
        }
        const negativeAllowed = negativeRef.current.checked;

        dispatch(userSliceActions.setUser({ name, topic, negativeScoreAllowed: negativeAllowed }))


        dispatch(fetchQuestions(topic));
        dispatch(userSliceActions.setQuizState(true));
    }

    if (questions !== undefined) {
        history.push('/quiz')
    }

    return (


        <Container
            p={{ base: "16px", md: "20px", lg: "30px" }}
            border="2px" borderColor="green"
            borderRadius="lg" mt={40}
            width={{ base: "90%", md: "100%" }}
        >
            <Heading color="teal">
                <Center fontSize={{ base: "30px", md: "40px", lg: "50px" }} >Select your quiz</Center>
            </Heading>
            <Box p={{ base: "10px", md: "40px", lg: "50px" }} mt="20">
                <FormControl isRequired>

                    <Input className={nameError ? 'name-input invalid' : 'name-input'} placeholder="Enter your name" id="nameInput" name="nameInput" value={name} mt={30} onInput={nameChangeHandler} autoFocus />

                    <Select placeholder="Select a topic" mt={30} ref={topicRef} >
                        <option value="gk">General Knowledge</option>
                        <option value="animals">Animals</option>
                        <option value="politics">Politics</option>
                        <option value="computers">Computers</option>
                        <option value="vehicles">Vehicles</option>
                        <option value="sports">Sports</option>
                    </Select>
                </FormControl>
                <Checkbox
                    defaultIsChecked name="negativeCheckbox"
                    mt={30}
                    onChange={checkboxToggleHandler}
                    ref={negativeRef}
                    isChecked={negativeCheck}>
                    Allow negative marking</Checkbox>
                <Button isLoading={isLoading} loadingText="Loading" spinnerPlacement="end" colorScheme="teal" mt={30} w="100%" onClick={setUserHandler}>Start Quiz</Button>

            </Box>
        </Container>


    );
}

export default Welcome;
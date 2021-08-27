import { Box, Stack, StackDivider, Text, Heading, Center, VStack } from '@chakra-ui/react';
import { Divider } from "@chakra-ui/react"
import { useEffect } from 'react';

import NewWindow from 'react-new-window'

const Demo = (props) => {

    useEffect(() => {
        window.addEventListener('onunload', () => {
            console.log('Changing')
        })
    }, [])

    return (
        < NewWindow >
            <Box>
                <VStack spacing={2} mt={{ base: "10px", md: "20px" }}>
                    <Center><Heading color="teal">Test Results</Heading></Center>
                    <Divider orientation="horizontal" />
                    <Stack direction={{ base: 'row', md: 'column' }} spacing={{ base: '2', md: '1' }}>
                        <Text fontSize={{ base: "xl", md: '2xl' }}>{props.name}</Text>
                        <Text fontSize={{ base: "xl", md: '2xl' }}>{props.topic}</Text>
                        <Text fontSize={{ base: "xl", md: '2xl' }}>{props.score}</Text>
                    </Stack>
                </VStack>
                <Stack divider={<StackDivider borderColor="gray.200" />} direction="column" spacing="24px">
                    {
                        props.problems.map((problem, i) => {
                            return (
                                <Box p={5} shadow="md" borderWidth="1px" padding="5px">
                                    <Box className="questionDiv" >
                                        {problem.ques}
                                    </Box>
                                    <Box>
                                        <VStack spacing={3}>
                                            {
                                                problem.choices.map((choice, j) => {
                                                    return (
                                                        <Box borderWidth="3px">
                                                            {choice}
                                                        </Box>
                                                    )
                                                })
                                            }
                                        </VStack>
                                        <VStack spacing={5}>
                                            <Box>Correct Answer: {problem.answer}</Box>
                                            <Box>Your choice: {props.responses[i] !== -1 ? props.responses[i] : 'Unattempted'}</Box>
                                        </VStack>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Stack>
            </Box>
        </NewWindow >
    )
}

export default Demo;
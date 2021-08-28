import { Box, Stack, StackDivider, Text, Heading, Center, VStack } from '@chakra-ui/react';

import Option from '../Option/Option';
import { Divider } from "@chakra-ui/react"
import { useEffect } from 'react';

import NewWindow from 'react-new-window'

const Demo = (props) => {

    const date = new Date().toLocaleDateString('gb');

    useEffect(() => {
        window.addEventListener('onunload', () => {
            console.log('Changing')
        })
    }, [])

    return (
        < NewWindow title={`Quiz Review --> ${props.name}`} center="parent" features={{ width: window.innerWidth, innerHeight: window.innerHeight }}>
            <Box>
                <Box spacing={2} mt={{ base: "10px", md: "20px" }}>
                    <Center><Heading color="teal">Test Results</Heading></Center>
                    <Divider orientation="horizontal" />
                    <Box
                        display={{ base: 'block', md: 'flex' }}
                        justifyContent={{ base: 'auto', md: 'space-evenly' }}
                        padding={{ base: '5px', md: '8px' }}
                        paddingStart={{ base: '20px', md: 'auto' }}
                        fontSize={{ base: '16px', md: '18px', lg: '20px' }}>
                        <Box >
                            <Box>
                                {props.name}
                            </Box>
                            <Box>
                                {props.topic}
                            </Box>
                        </Box>
                        <Box>
                            <Box>
                                <Text fontWeight="600">Score Obtained: {props.score}</Text>
                            </Box>
                            <Box>
                                {date}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Stack
                    divider={<StackDivider borderColor="gray.200" />}
                    direction="column"
                    spacing="24px">
                    {
                        props.problems.map((problem, i) => {
                            return (
                                <Option
                                  key={i}
                                  problem={problem}
                                  choice={props.responses[i]}
                                >
                                </Option>
                            )
                        })
                    }
                </Stack>
            </Box>
        </NewWindow >
    )
}

export default Demo;
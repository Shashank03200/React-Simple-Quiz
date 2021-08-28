import { Box, VStack, Center, Heading } from '@chakra-ui/react';

import React from 'react';

const Option = ({ problem, choice }) => {
    return (
        <Box p={5} shadow="md" borderWidth="1px" padding="5px">
            <Box fontSize={{ base: '14px', md: '18px', lg: '20px' }} padding="10px" paddingStart="50px">
                {problem.ques}
            </Box>
            <Box padding={{ base: "10px" }} display={{ base: "block", lg: 'flex' }} marginTop={["20px"]}>
                <VStack spacing={4} flex={{ lg: '6' }}>
                    {
                        problem.choices.map((choice, j) => {
                            return (
                                <Box p="4px" paddingStart="20px" fontSize={{ base: '14px', md: '18px', lg: '20px' }} borderWidth="1px" borderRadius="md" width="80%" borderColor="teal.400" >
                                    {choice}
                                </Box>
                            )
                        })
                    }
                </VStack>
                <VStack flex={{ lg: '6' }} mt={{ base: "30px" }} spacing={5} fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
                    <Box padding="5px" paddingStart="50px" borderColor="olive" borderWidth="2px" borderRadius="md" width="80%" >Correct Answer : {problem.answer}</Box>
                    <Box padding="5px" paddingStart="50px" borderWidth="2px" borderColor={choice === -1 ? 'blue.600' : choice === problem.answer ? 'limegreen' : 'red.700'} borderRadius="md" width="80%">Your choice    : {choice !== -1 ? choice : 'Unattempted'}</Box>
                </VStack>
            </Box>
        </Box >
    );
}

export default Option;
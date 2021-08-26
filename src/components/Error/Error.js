import { Center, Container, Text, VStack, Button } from "@chakra-ui/react";

const Error = () => {
    return (
        <Center>
            <Container mt={['4rem', '5rem']}>
                <VStack spacing={['2rem', '6rem']}>
                    <Text color="teal" fontSize={{ base: "2xl", md: "6xl" }}>
                        Quiz Interrupted
                    </Text>
                    <Text fontSize={{ base: "2xl", md: "4xl" }}>
                        Proceed to quiz setup page
                    </Text>
                    <Button colorScheme="teal" onClick={() => window.location.href = "/"}>
                        Main Menu
                    </Button>
                </VStack >
            </Container >
        </Center >
    );
}

export default Error;
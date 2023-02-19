import { FormLabel, Input, Box, Button, VStack } from "@chakra-ui/react";
// import { FormLabel } from "@chakra-ui/form-control";
export const Form = () => {
    return (
        <VStack>
            <Box>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input id="email" type="email" />
            </Box>
            <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" />
            </Box>
            <Button
                background="blue.300"
                color="white"
                _hover={{ background: "blue.400" }}>
                登録
            </Button>
        </VStack>
    );
};

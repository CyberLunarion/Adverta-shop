import { Button, Input, InputGroup, InputRightElement, Box, Container, Heading, VStack, useColorModeValue, useToast, Link} from "@chakra-ui/react";
import { useState } from "react";
import { useAccountStore } from "../store/account.js";

	function LoginPage() {
		const [show, setShow] = useState(false)
		const handleClick = () => setShow(!show)

		const [account, setAccount] = useState({
			email: "",
			password: "",
		});
		const toast = useToast();

		const { loginAccount } = useAccountStore();

		const handleLogin = async () => {
			const { success, message } = await loginAccount(account);
			if (!success) {
				toast({
					title: "Error",
					description: message,
					status: "error",
					isClosable: true,
				});
			} else {
				toast({
					title: "Success",
					description: message,
					status: "success",
					isClosable: true,
				});
			}
			setAccount({ email: "", password: "" });
		};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Log into Account
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Enter Email'
							name='email'
							value={account.email}
							onChange={(e) => setAccount({ ...account, email: e.target.value })}
						/>
						<InputGroup>
							<Input
								placeholder='Enter Password'
								name='password'
								type={show ? 'text' : 'password'}
								value={account.password}
								onChange={(e) => setAccount({ ...account, password: e.target.value })}
							/>
							<InputRightElement width='4.5rem'>
        						<Button h='1.75rem' size='sm' onClick={handleClick}>
          							{show ? 'Hide' : 'Show'}
        						</Button>
      						</InputRightElement>
						</InputGroup>
						<Button colorScheme='orange' onClick={handleLogin} w='full'>
							Login
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default LoginPage;

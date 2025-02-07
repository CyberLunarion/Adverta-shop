import { Button, Input, InputGroup, InputRightElement, Box, Container, Heading, VStack, useColorModeValue, useToast, Link} from "@chakra-ui/react";
import { useState } from "react";
import { useAccountStore } from "../store/account";

	function RegisterPage() {
		const [show, setShow] = useState(false)
		const handleClick = () => setShow(!show)

		const [newAccount, setNewAccount] = useState({
			username: "",
			email: "",
			password: "",
		});
		const toast = useToast();

		const { registerAccount } = useAccountStore();

		const handleRegisterAccount = async () => {
			const { success, message } = await registerAccount(newAccount);
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
			setNewAccount({ username: "", email: "", password: "" });
		};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create A New Account
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Enter Username'
							name='username'
							value={newAccount.username}
							onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
						/>
						<Input
							placeholder='Enter Email'
							name='email'
							value={newAccount.email}
							onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
						/>
						<InputGroup>
							<Input
								placeholder='Enter Password'
								name='password'
								type={show ? 'text' : 'password'}
								value={newAccount.password}
								onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
							/>
							<InputRightElement width='4.5rem'>
        						<Button h='1.75rem' size='sm' onClick={handleClick}>
          							{show ? 'Hide' : 'Show'}
        						</Button>
      						</InputRightElement>
						</InputGroup>
						<Button colorScheme='orange' onClick={handleRegisterAccount} w='full'>
							Register
						</Button>
					</VStack>
				</Box>
				<Link href={"http://localhost:5173/login"}>
					Already have an Account?
				</Link>
			</VStack>
		</Container>
	);
};
export default RegisterPage;

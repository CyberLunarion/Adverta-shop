import { Button, Container, Flex, HStack, Text, useColorMode, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverAnchor, Stack, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAccountStore } from "../store/account"; 

import { PlusSquareIcon, SearchIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { logoutAccount } = useAccountStore();
	const toast = useToast();

	const handleLogout = async () => {
		const { success, message } = await logoutAccount();
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
	};

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, yellow.400, orange.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Adverta</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>	
					<Popover>
						<PopoverTrigger>
							<Button>Account</Button>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverHeader>My Account</PopoverHeader>
							<PopoverBody>
								<Stack spacing={2} alignItems={"left"}>
									<Text>
										Welcome back, Account Name
									</Text>
									<Button size='xs'>
										<Link to={"/register"}>
											Make an Account
										</Link>
									</Button>
									<Button size='xs'>
										<Link to={"/login"}>
											Log into Account
										</Link>
									</Button>
									<Button size='xs'>
											<Link onClick={handleLogout}>
												Log out of Account
											</Link>
									</Button>
								</Stack>
							</PopoverBody>
						</PopoverContent>
					</Popover>
					<Button>
						<Link to={"/search"}>
							<SearchIcon/>
						</Link>	
					</Button>
					<Link to={"/create"}>
						<Button>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;

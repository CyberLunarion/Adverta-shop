import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useAdvertStore } from "../store/advert.js";

const CreatePage = () => {
	const [newAdvert, setNewAdvert] = useState({
		name: "",
		price: "",
		image: "",
		category: "",
	});
	const toast = useToast();

	const { createAdvert } = useAdvertStore();

	const handleAddAdvert = async () => {
		const { success, message } = await createAdvert(newAdvert);
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
		setNewAdvert({ name: "", price: "", image: "", category: "", });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Advert
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Advert Name'
							name='name'
							value={newAdvert.name}
							onChange={(e) => setNewAdvert({ ...newAdvert, name: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
							value={newAdvert.price}
							onChange={(e) => setNewAdvert({ ...newAdvert, price: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newAdvert.image}
							onChange={(e) => setNewAdvert({ ...newAdvert, image: e.target.value })}
						/>
						<Select 
							placeholder='Choose a Category' 
							name='category' 
							value={newAdvert.category }
							onChange={(e) => setNewAdvert({ ...newAdvert, category: e.target.value })}
						>
							<option value="Cars">Cars</option>
							<option value="Phones">Phones</option>
							<option value="Computers">Computers</option>
							<option value="Animals">Animals</option>
							<option value="Houses & Homes">Houses & Homes</option>
							<option value="Land">Land</option>

						</Select>

						<Button colorScheme='orange' onClick={handleAddAdvert} w='full'>
							Add Advertisement
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;

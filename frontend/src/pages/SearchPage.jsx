import { Container, SimpleGrid, Select, useToast, Input, Text, VStack, HStack, Stack, Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdvertStore } from "../store/advert";
import AdvertCard from "../components/AdvertCard";

const SearchPage = () => {
	const { searchAdverts, adverts } = useAdvertStore();

	const [advert, setAdvert] = useState({
		name: "",
		category: "",
	});
	const toast = useToast();

	const handleSearch = async () => {
		const { success } = await searchAdverts(advert);
		if (!success) {
			console.log("Unsuccessfully Searched")
		} else {
			console.log("Succesfully Searched")
		}
	};

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
                <HStack boxSize={"full"} justifyContent={"space-between"}>
                    <Text
                        fontSize={"30"}
                        fontWeight={"bold"}
                        bgGradient={"linear(to-r, yellow.400, orange.500)"}
                        bgClip={"text"}
                        textAlign={"center"}
                    >
                        Search Results
                    </Text>
                    <Popover>
                        <PopoverTrigger>
                            <Button>Search</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                        <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Search For an Advert</PopoverHeader>
                            <PopoverBody>
                                <Stack spacing={2} alignItems={"left"}>
                                    <Input
                                        placeholder='Enter Name'
                                        name='name'
                                        value={advert.name}
                                        onChange={(e) => setAdvert({ ...advert, name: e.target.value })}
                                    />
                                    <Select 
                                        placeholder='Choose a Category' 
                                        name='category' 
                                        value={advert.category }
                                        onChange={(e) => setAdvert({ ...advert, category: e.target.value })}
                                    >
                                        <option value="Cars">Cars</option>
                                        <option value="Phones">Phones</option>
                                        <option value="Computers">Computers</option>
                                        <option value="Animals">Animals</option>
                                        <option value="Houses & Homes">Houses & Homes</option>
                                        <option value="Land">Land</option>
                                    </Select>
                                    <Button onClick={handleSearch}>
                                        Submit
                                    </Button>
                                </Stack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </HStack>
				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{adverts.map((advert) => (
						<AdvertCard key={advert._id} advert={advert} />
					))}
				</SimpleGrid>

				{adverts.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No Adverts found {" "}
						<Link to={"/create"}>
							<Text as='span' color='orange.500' _hover={{ textDecoration: "underline" }}>
								Create an advert
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default SearchPage;
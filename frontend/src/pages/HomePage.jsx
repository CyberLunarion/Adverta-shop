import { Container, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdvertStore } from "../store/advert";
import AdvertCard from "../components/AdvertCard";

const HomePage = () => {
	const { fetchAdverts, adverts } = useAdvertStore();

	useEffect(() => {
		fetchAdverts();
	}, [fetchAdverts]);
	console.log("adverts", adverts);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, yellow.400, orange.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Adverts
				</Text>

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
export default HomePage;

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Select,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
	Tag,
	TagLabel,
} from "@chakra-ui/react";
import { useAdvertStore } from "../store/advert";
import { useState } from "react";

const AdvertCard = ({ advert }) => {
	const [updatedAdvert, setUpdatedAdvert] = useState(advert);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteAdvert, updateAdvert } = useAdvertStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteAdvert = async (pid) => {
		const { success, message } = await deleteAdvert(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateAdvert = async (pid, updatedAdvert) => {
		const { success, message } = await updateAdvert(pid, updatedAdvert);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={advert.image} alt={advert.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<HStack spacing={2}>
				<Tag
						size={'lg'}
						key={'lg'}
						/*borderRadius='full'*/
						variant='solid'
						colorScheme='yellow'
					>
						<TagLabel>
							{advert.name}
						</TagLabel>
					</Tag>
					<Tag
						size={'sm'}
						borderRadius='full'
						variant='outline'
						colorScheme='orange'
					>
						<TagLabel>
							{advert.category}
						</TagLabel>
					</Tag>
				</HStack>
					<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
						${advert.price}
					</Text>
					
					<HStack spacing={2}>
						<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='orange' />
						<IconButton
							icon={<DeleteIcon />}
							onClick={() => handleDeleteAdvert(advert._id)}
							colorScheme='red'
						/>
					</HStack>
				
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Advert</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Advert Name'
								name='name'
								value={updatedAdvert.name}
								onChange={(e) => setUpdatedAdvert({ ...updatedAdvert, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedAdvert.price}
								onChange={(e) => setUpdatedAdvert({ ...updatedAdvert, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedAdvert.image}
								onChange={(e) => setUpdatedAdvert({ ...updatedAdvert, image: e.target.value })}
							/>
							<Select 
								placeholder='Choose a Category' 
								name='category' 
								value={updatedAdvert.category }
								onChange={(e) => setUpdatedAdvert({ ...updatedAdvert, category: e.target.value })}
							>
								<option value="Cars">Cars</option>
								<option value="Phones">Phones</option>
								<option value="Computers">Computers</option>
								<option value="Animals">Animals</option>
								<option value="Houses & Homes">Houses & Homes</option>
								<option value="Land">Land</option>
							</Select>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='orange'
							mr={3}
							onClick={() => handleUpdateAdvert(advert._id, updatedAdvert)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default AdvertCard;

import mongoose from "mongoose";
import Advert from "../models/advert.model.js";

export const getAdverts = async (req, res) => {
	try {
		const adverts = await Advert.find({});
		res.status(200).json({ success: true, data: adverts });
	} catch (error) {
		console.log("error in fetching adverts:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const searchAdverts = async (req, res) => {
	const advert = req.body; // category and/or name 
	// If no name and category provided, show all products
	if (!advert.name && !advert.category) {
		try {
			const adverts = await Advert.find({});
			res.status(200).json({ success: true, data: adverts });
		} catch (error) {
			console.log("error in fetching adverts:", error.message);
			res.status(500).json({ success: false, message: "Server Error" });
		}
	}
	// if only name provided, search by name
	if (advert.name && !advert.category) {
		try {
			const adverts = await Advert.find({ name: { $regex: advert.name, $options: "i" } })
			res.status(200).json({ success: true, data: adverts });
		} catch (error) {
			console.log("error in fetching adverts:", error.message);
			res.status(500).json({ success: false, message: "Server Error" });
		}
	}
	// if only category provided, search by category
	if (!advert.name && advert.category) {
		try {
			const adverts = await Advert.find({ category: advert.category })
			res.status(200).json({ success: true, data: adverts });
		} catch (error) {
			console.log("error in fetching adverts:", error.message);
			res.status(500).json({ success: false, message: "Server Error" });
		}
	}
	// if both name and category provided, search by both
	if (advert.name && advert.category) {
		try {
			const adverts = await Advert.find({ name: { $regex: advert.name, $options: "i" }, category: advert.category })
			res.status(200).json({ success: true, data: adverts });
		} catch (error) {
			console.log("error in fetching adverts:", error.message);
			res.status(500).json({ success: false, message: "Server Error" });
		}
	}
};

export const createAdvert = async (req, res) => {
	const advert = req.body; // user will send this data

	if (!advert.name || !advert.price || !advert.image || !advert.category) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newAdvert = new Advert(advert);

	try {
		await newAdvert.save();
		res.status(201).json({ success: true, data: newAdvert });
	} catch (error) {
		console.error("Error in Create advert:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateAdvert = async (req, res) => {
	const { id } = req.params;

	const advert = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Advert Id" });
	}

	try {
		const updatedAdvert = await Advert.findByIdAndUpdate(id, advert, { new: true });
		res.status(200).json({ success: true, data: updatedAdvert });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteAdvert = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Advert Id" });
	}

	try {
		await Advert.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Advert deleted" });
	} catch (error) {
		console.log("error in deleting advert:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

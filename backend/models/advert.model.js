import mongoose from "mongoose";

const advertSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Advert = mongoose.model("Advert", advertSchema);

export default Advert;

import express from "express";

import { createAdvert, deleteAdvert, getAdverts, searchAdverts, updateAdvert } from "../controllers/advert.controller.js";

const router = express.Router();

router.get("/", getAdverts);
router.post("/search", searchAdverts)
router.post("/", createAdvert);
router.put("/:id", updateAdvert);
router.delete("/:id", deleteAdvert);

export default router;

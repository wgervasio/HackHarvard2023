import { displayData, updateData } from "../controllers/data";
import { Router } from "express";

const router = Router();

router.route("/").get(displayData);

// GET request for company info on a company page
router.route("/").put(updateData);

module.exports = router;
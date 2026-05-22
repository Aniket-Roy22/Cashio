import express from "express";

import {authenticateAccessToken} from "../middleware/authenticateTokens.js";

import {createCategory} from "../controllers/category/createCategory.js";
import {getAllCategories, getCategoryById} from "../controllers/category/getCategory.js";
import {updateCategory} from "../controllers/category/updateCategory.js";
import {deleteCategory} from "../controllers/category/deleteCategory.js";
import {resetCategory} from "../controllers/category/resetCategory.js";

const router = express.Router();

router.use(authenticateAccessToken);

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.delete("/:id/reset", resetCategory);

export default router;
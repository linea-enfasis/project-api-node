import { Router } from "express";
import { getProducts, saveProducts, updateProducts, deleteProducts } from "../controllers/ProductsController.js";
const router = Router();
router.get('/products', getProducts);
router.get('/products/:id', getProducts);
router.post('/products', saveProducts);
router.put('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts);

export default router;
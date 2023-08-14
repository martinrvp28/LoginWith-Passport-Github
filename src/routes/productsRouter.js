import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { __dirname } from "../utils.js";
import {upload} from "../middlewares/multerThumbnail.js";

import * as controller from "../controllers/product.controllers.js";

const router = Router();

const productManager = new ProductManager(__dirname + '/db/products.json');

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);



export default router;
import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../managers/productManager.js";
import {login, register, errorLogin, errorRegister, profile} from "../controllers/views.controllers.js";

const router = Router();

const productManager = new ProductManager(__dirname + '/db/products.json');

router.get('/', async (req,res) => {

    try {
        const products = await service.getAll();
        res.render('home', {products})
    } catch (error) {
        console.log(error.message);
    }
    
});

router.get('/realtimeproducts', (req,res) => {

    res.render('realTimeProducts')

});

router.get('/login',login);
router.get('/register',register);
router.get('/error-login',errorLogin);
router.get('/error-register',errorRegister);
router.get('/profile', profile);
router.get('/logout', (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/login');
    } catch (error) {
        
    }
});


export default router;
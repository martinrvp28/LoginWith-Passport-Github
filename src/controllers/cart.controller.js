import * as service from "../services/cart.services.js";
import mongoose, { isValidObjectId } from "mongoose";

export const getAll = async (req,res,next) => {
    
    try {
        const response = await service.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
}

export const create = async (req, res, next) => {

    try {
        const obj = {products:[]}
        const response = await service.create(obj);
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
}

export const getById = async (req, res, next) => {

    try {
        const {idCart} = req.params;
        const cart = await service.getById(idCart);
        console.log(cart);
        if (!cart) res.status(404).json({msg:'Cart not found'});
        else res.render('cart', cart)
    } catch (error) {
        next(error.message);
    }
    
}

export const addProductToCart = async (req,res,next) => {

    try {
        const {idCart, idProduct} = req.params;
        const addCart = await service.addProductToCart(idCart,idProduct);
        if (!addCart) res.status(404).json({msg:'Cart not found ACA'});
        else res.json(addCart);
    } catch (error) {
        next(error.message);
    }

}

export const deleteProductFromCart = async (req,res,next) => {

    try {
        const {idCart, idProduct} = req.params;
        const del = await service.deleteProductFromCart(idCart,idProduct);
        if (!del) res.status(404).json({msg:'Cart or Product not found'});
        else res.json(del);

    } catch (error) {
        console.log(error);
    }
}

export const updateCart = async (req,res,next) => {
    try {
        
        const {idCart} = req.params;
        const obj = req.body;

        const add = await service.updateCart(idCart,obj);
        if (!add) res.status(404).json({msg:'Cart not found'});
        else res.json(add);
    } catch (error) {
        console.log(error);
    }
}

export const updateQuantity = async (req,res,next) => {
    try {
        const {idCart, idProduct} = req.params;
        const objQ = req.body;

        const upd = await service.updateQuantity(idCart, idProduct, objQ);
        
        if (!upd) res.status(404).json({msg:'Cart or Product not found'});
        else res.json(upd);
    } catch (error) {
        console.log(error);
    }
}

export const emptyCart = async (req, res, next) => {

    try {
        const {idCart} = req.params;
        const del = await service.emptyCart(idCart);
        if (!del) res.status(404).json({msg:'Cart  not found'});
        else res.json(del);
    } catch (error) {
        console.log(error);
    }

}
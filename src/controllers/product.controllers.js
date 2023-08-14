import * as service from "../services/product.services.js";
import mongoose from "mongoose";

export const getAll = async (req, res, next) => {
    try {

        const limit = req.query.limit ? req.query.limit : 10;
        const sort = req.query.sort;
        const page = req.query.page ? req.query.page : 1;
        const query = req.query.query;
        const queryValue = req.query.queryValue;


        const products = await service.getAll(limit,sort,page,query,queryValue);

        const prevQueryParams = {
            limit,
            sort: sort ? sort : undefined,
            page: products.prevPage,
            query: query ? query : undefined,
            queryValue: queryValue ? queryValue : undefined
        };
        const prevLinkQuery = Object.entries(prevQueryParams)
            .filter(([key, value]) => value !== undefined) // Filtrar los parámetros opcionales
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        const prevLink = `${req.baseUrl}${req.path}?${prevLinkQuery}`;

        const nextQueryParams = {
            limit,
            sort: sort ? sort : undefined,
            page: products.nextPage,
            query: query ? query : undefined,
            queryValue: queryValue ? queryValue : undefined
        };
        const nextLinkQuery = Object.entries(nextQueryParams)
            .filter(([key, value]) => value !== undefined) // Filtrar los parámetros opcionales
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        const nextLink = `${req.baseUrl}${req.path}?${nextLinkQuery}`;

        console.log(`Este es el link a anterior${prevLink}`);
        console.log(`Este es el link a siguiente${nextLink}`);

        const response = {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            page: products.page,
            prevLink: prevLink ? prevLink : null,
            nextLink: nextLink ? nextLink : null
          };

          console.log(response.payload);

        res.render('products', {response});
    } catch (error) {
        next(error.message);
    }
}

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prod = await service.getById(id);
        if(!prod) res.status(404).json({msg:'Prod not found'})
        else res.json(prod);
    } catch (error) {
        next(error.message);
    }
}

export const create = async (req, res, next) => {
    try {

        console.log(req.body.code);
        const newProd = await service.create(req.body);
        if(!newProd) res.status(404).json({msg:'Validation error'});
        else res.json(newProd);
    } catch (error) {
        next(error.message);
    }
}

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (mongoose.Types.ObjectId.isValid(id)){
            const prodUpd = await service.update(id,req.body);
            if(!prodUpd) res.status(404).json({msg:'Prod not found'})
            else res.json(prodUpd);
        } else res.json({msg:'ID not valid'});
        
    } catch (error) {
        next(error.message);
    }
}

export const remove = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (mongoose.Types.ObjectId.isValid(id)){
            const prodDel = await service.remove(id);

            if(!prodDel) res.status(404).json({msg:'Prod not found'})
            else res.json(prodDel);
        } else res.json({msg:'ID not valid'});

    } catch (error) {
        next(error.message);
    }
}
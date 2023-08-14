import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();

// #PARA CAMBIAR DE PERSISTENCIA DE DATOS

// import CartDaoFS from "../daos/filesystem/cart.dao.js";
// const cartDao = new CartDaoFS();

export const getAll = async () => {

    try {
        const response = await cartDao.getAll();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const create = async () => {
    
    try {
        const item = await cartDao.create();
        if(!item) return false;
        else return item;
        
    } catch (error) {
        console.log(error);
    }
}

export const getById = async (id) => {

    try {
        const item = await cartDao.getById(id);
        if (!item) return false;
        else return item;
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = async (cartId,prodId) => {

    try {
        const response = await cartDao.addProductToCart(cartId,prodId);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductFromCart = async (idCart,idProduct) => {
    try {
        const response = await cartDao.deleteProductFromCart(idCart,idProduct);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateCart = async (idCart, obj) => {
    try {
        const response = await cartDao.updateCart(idCart,obj);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateQuantity = async (idCart, idProduct, objQ) => {
    try {
        const response = await cartDao.updateQuantity(idCart,idProduct,objQ);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const emptyCart = async (idCart) => {
    try {
        const response = await cartDao.emptyCart(idCart);
        return response;
    } catch (error) {
        console.log(error);
    }
}
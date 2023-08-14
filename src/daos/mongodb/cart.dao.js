import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB{

    async getAll(){
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj){

        try {

            const response = await CartModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){

        try {
            const response = await CartModel.findById(id).lean().populate('products.id');
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(idCart,idProd){

        try {
            
            const cart = await CartModel.findById(idCart);
            if (cart){

                const prodExists = cart.products.find(p => p.id.toString() === idProd.toString());
                console.log(prodExists);
                if(prodExists){
                    
                    prodExists.quantity = prodExists.quantity + 1;
                    cart.markModified('products');

                } else {

                    const newProd = {
                        id: idProd,
                        quantity: 1
                    }

                    cart.products.push(newProd);
                }

                await cart.save();
                return cart;

            } else return false;


        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart(idCart,idProduct){

        try {
            const carrito = await CartModel.findById(idCart);
            if (!carrito) {
                return false;
            }
            const index = carrito.products.findIndex((producto) => producto.id.toString() === idProduct.toString());
            console.log(index);
            if (index === -1) {
                return false;
            }

            carrito.products.splice(index, 1);
            await carrito.save();
    
            return carrito;

        } catch (error) {
            console.log(error);
        }
    
    }


    async updateCart(idCart, obj){

        try {
            const cart = await CartModel.findById(idCart);

            if (!cart) {
                return false;
            }
            console.log(obj);
            cart.products = obj;
            const updatedCart = await cart.save();
            return updatedCart;

        } catch (error) {
            console.log(error);
        }
    }

    async updateQuantity(idCart, idProduct, objQ){

        try {
            
            const cart = await CartModel.findById(idCart); 
            
            if (!cart) return false;
            
            const index = cart.products.findIndex((product) => product.id.toString() === idProduct.toString());
            
            if (index === -1) {
            return false;
            }

            const newQuantity = objQ.quantity;
            cart.products[index].quantity = newQuantity;
            await cart.save();

            return cart;
            
        } catch (error) {
            console.log(error);
        }
}

    async emptyCart(idCart){

        try {

            const cart = await CartModel.findById(idCart); 
            console.log(cart);
            if (!cart) return false;

            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }

    }

}
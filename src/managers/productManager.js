import fs from 'fs';
import { __dirname } from '../utils.js';
const pathFile = __dirname + '/db/products.json';

export default class ProductManager{
    constructor(path){
        this.path = path;
    }

    async addProduct(product){
        
        try {
            

            const productsFile = await this.getProducts();

            if (!(productsFile.some((c) => c.code===product.code)) && (this.#validateFields(product))) {
                
                product.id = await this.#getMaxId() +1;

                if (product.status === "false") {
                    product.status = false;
                } else {
                    product.status = true;
                }

                productsFile.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile))

            } else if (!this.#validateFields(product)) {
                console.log(`Error al agregar el producto ${product.title}, por favor verifique los campos del mismo.`);
            } else {
                console.log(`Error al agregar el producto ${product.title}, ya existe un producto con el mismo codigo.`)
            }

            
        } catch (error) {
            
        }

    }

    async #getMaxId(){
        try {
            const productsFile = await this.getProducts();
            let maxId=0;
            productsFile.map((p) => {
                if (p.id > maxId) maxId = p.id;
            })

            return maxId
            
        } catch (error) {
            console.log(error);
        }

    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(products);
                return productsJS;
            } else {
                return []
            }
            
        } catch (error) {
            console.log(error);
        }

    }

    async getProductById(i){

        try {
            const productsFile = await this.getProducts();
            const prod = productsFile.find(prod =>{
                return prod.id===i;
            })
    
            if (!prod) {
                console.log("Product not found")
            } else {
                return prod;
            }
            
        } catch (error) {
            console.log(error);
        }

    }


    async updateProduct(id,newProduct){

        try {
            const products = await this.getProducts();
            let prod =  await this.getProductById(id);

            if (prod) {
                prod = {
                    ...prod,
                    ...newProduct,
                    id: id
                }

                const newProductFiles = products.map(p => {
                    if (p.id === id) return prod;
                    else return p;
                })

                await fs.promises.writeFile(this.path, JSON.stringify(newProductFiles))

            } else {
                console.log('Product not found')
            }

            
    
        } catch (error) {
            console.log(error);
            
        }

    }

    async deleteProduct(i){
        try {
            const productsFile = await this.getProducts();

            if (productsFile.some((c) => c.id===i)) {

                const newFiles = productsFile.filter(p => {
                    return p.id!==i;                
                })
                await fs.promises.writeFile(this.path, JSON.stringify(newFiles))
            } else {
                console.log(`Error al eliminar el producto, no existe ningun producto con el id ${i}`);
            }

        } catch (error) {
            console.log(error);
        }
    }

    #validateFields(prod) {
        return (
        typeof prod.title === "string" && 
        typeof prod.description === "string" && 
        typeof prod.price === "number" && 
        typeof prod.code === "string" && 
        typeof prod.stock === "number" &&
        typeof prod.category === "string" &&
        prod.title &&
        prod.description &&
        prod.price &&
        prod.code &&
        prod.stock &&
        prod.category
        );
    }      

    #isInProducts(cod){

        return this.products.some((c) => c.code===cod)

    }
}



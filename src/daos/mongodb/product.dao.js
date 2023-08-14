import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB{

    async getAll
    (
        limit = 10,
        sort = null,
        page = 1,
        query = null,
        queryValue = null
        ){

        try {

            const order = sort === 'desc' ? -1 : 1;
            
            let filterOps;
            if ( query && queryValue ) {

                if (query === "status"){

                    if (queryValue.toLowerCase() === "true") {
                        queryValue = true;
                    } else if(queryValue.toLowerCase() === "false") 
                        queryValue = false;

                    filterOps = { [query]: queryValue };

                } else filterOps = { [query]: { $regex: queryValue, $options: 'i' } };
                
            }
    
            const response = await ProductModel.paginate(filterOps, {
                lean: true,
                limit: limit,
                page: page,
                sort: order !== null ? { price: order } : undefined
            });

            return response;

        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){

        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductByCode (code) {
        try {
            const response = await ProductModel.findOne({ code });
            return response;
        } catch (error) {
            return false;
        }
    };

    async create(obj) {
        try {
            const existingProduct = await this.getProductByCode(obj.code);
    
            if (existingProduct === null) {
                const response = await ProductModel.create(obj);
                return response;
            } else {
                throw new Error('Ya existe un producto con el mismo código');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async update(id,obj){

        try {
            const response = await ProductModel.findByIdAndUpdate(id,obj,{new:true});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id){
        
        try {
            const response = await ProductModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }



}
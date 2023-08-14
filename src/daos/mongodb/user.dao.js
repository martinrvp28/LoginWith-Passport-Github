import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../utils.js";

export default class UserDao {

    async register(user){
        try {
            const {email, password} = user;
            const existUser = await this.getByEmail(email);
            console.log('existUser::', existUser);
            if(!existUser){
                const newUser = await UserModel.create({
                    ...user,
                    password: createHash(password)
                });
                return newUser;
            }
            else return false;
        } catch (error) {
            console.log(error);
        }
    }

    async login(email, password){

        try {
            const userExist = await this.getByEmail(email);

            if (userExist) {
                const passValid = isValidPassword(password, userExist);
                if (!passValid) return false;
                else return userExist;
            } 
            else return false;
        } catch (error) {
            console.log(error);
        }
        
    }


    async getById(id){
        try {
            const userExist = await UserModel.findById(id);
            if (userExist){
                return userExist;
            } else return false;
;        } catch (error) {
            console.log(error);
        }
    }

    async getByEmail(email){
        try {
            const userExist = await UserModel.findOne({email});
            if (userExist){
                return userExist;
            } else return false;
        } catch (error) {
            console.log(error);
        }
    }
}
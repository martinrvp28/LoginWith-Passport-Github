import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();

export const registerUser = async (req,res) => {
    try {
        res.json({msg: 'Register Ok', session: req.session});

    } catch (error) {
        console.log(error);
    }
};


export const loginUser = async (req, res) => {
    try {

        const user = await userDao.getById(req.session.passport.user);
        res.json({msg: 'Login Ok', user});
        
    } catch (error) {
        console.log(error);
    }
}

export const gitHubResponse = async (req,res,next) => {
    try {
        const {first_name, last_name, email, isGitHub} = req.user;
        res.json({
            msg:'Register/Login GitHub OK',
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                isGitHub
            }
        })
    } catch (error) {
        console.log(error)
    }
}

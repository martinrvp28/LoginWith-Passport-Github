import { Strategy as GitHubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();

const strategyOptions = {
    clientID:'Iv1.88a33aa53df23142',
    clientSecret:'4963fb931174a22b10da9e9d8875df734d56f428',
    callbackURL:'http://localhost:8080/profile-github'
};

const registerOrLogin = async (accessToken, refreshToken, profile,done) => {
    // console.log('profile', profile);

    const email = profile._json.email !== null ? profile._json.email : profile_json.blog;
    const user = await userDao.getByEmail(email);
    if(user) return done(null, user);
    const newUser = await userDao.register({
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1],
        email,
        password:'',
        isGitHub: true
    });

    return done(null, newUser);

}


passport.use('github', new GitHubStrategy(strategyOptions, registerOrLogin));
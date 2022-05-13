import UserModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
import Auth from "../configs/auth.config.js";
import jwt  from "jsonwebtoken";

const UserService ={};

UserService.getAllUsers = async () => {
    return await UserModel.find().populate("course", "subscribers");
}

UserService.getUserById = async (id) => {
    return await UserModel.findById(id).populate("course", "subscribers");
}

UserService.updateUser = async (id, user) => {

    const userUpdate = await UserModel.findById(id);

    if(!userUpdate) throw "User not found!!!";

    if (user.password) {
        user.password = bcrypt.hashSync(user.password, 8);
    }

    Object.assign(userUpdate, user);

    await userUpdate.save();

}

UserService.deleteUser = async (id) => {
    return await UserModel.findByIdAndRemove(id);
}

UserService.createUser = async (user) => {
    if(await UserModel.findOne({email: user.email})) {
        throw `Email  ${user.email} is already taken`;
    }

    const userCreate = new UserModel(user);

    //hash password 
    if(user.password) {
        userCreate.password = bcrypt.hashSync(user.password, 8);
    }

    await userCreate.save();
}

UserService.login = async(email, password) => {
    const user = await UserModel.findOne({email});
    console.log(user.password);
    console.log(user);
    if(user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({sub: user._id}, Auth.secret, {expiresIn: '7d'});
        return {
            ...user.toJSON(),
            token
        };
    }
}

export default UserService;
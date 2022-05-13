import mongoose from "mongoose";
import UserService from "../services/user.service.js";


const UserController = {};

UserController.getAllUsers = async (req, res) => {
    // try {
    //     const listUser = await UserService.getAllUsers();
    //     res.status(200).json({
    //         success: true,
    //         List_User: listUser,
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         error: error.message
    //     })
    // }
    UserService.getAllUsers()
        .then((users) => res.json(users))
        .catch(err => res.err);
}

UserController.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await UserService.deleteUser(id);
        res.status(200).json({
            success: true,
            message: "DELETE successfully!!!!!",
        }) 
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}

UserController.createUser = async (req, res) => {
    const user = {
        // _id: mongoose.Schema.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode,
        password: req.body.password,
        courses: req.body.courses,
        subscribedAccount: req.body.subscribedAccount,
    }
    await UserService.createUser(user)
        .then(() => {
            res.status(201).json({
                success: true,
                message: `Create User successfully!!!`,
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Can't create User!!!",
                error: error.message
            })
        })
}

UserController.updateUser = async (req, res) => {
    const userUpdate = {
        // _id: mongoose.Schema.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode,
        password: req.body.password,
        courses: req.body.courses,
        subscribedAccount: req.body.subscribedAccount,
    }
    await UserService.updateUser(userUpdate)
        .then(() => {
            res.status(200).json({
                success: true,
                message: `Update User successfully!!!`,
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Can't Update User!!!",
                error: error.message
            })
        })
}

UserController.login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    await UserService.login(email, password)
        .then(user => user ? res.json({ success: true, User: user, }) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(error => {
            console.log(error);
        })
}

export default UserController;

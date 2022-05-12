import mongoose from "mongoose";
import UserModel from "../models/user.model";


const UserController = {};

UserController.createUser = async (req, res) => {
    const user = await UserModel.create({
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            first: req.body.first,
           last: req.body.last, 
        },
        email: req.body.email,
        zipCode: req.body.zipCode,
        password: req.body.password,
        
    })
    return user
        .save()
        .then((newUser) => {
            res.status(201).json({
                message: `Create User successfully!!!`,
                UserModel: newUser,
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Can't create User!!!",
                error: error.message
            })
        })
} 
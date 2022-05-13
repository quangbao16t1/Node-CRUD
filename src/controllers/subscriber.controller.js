import mongoose from "mongoose";
import SubscriberService from "../services/subscriber.service.js";


const SubscriberController = {};

SubscriberController.createSubscriber = async (req, res) => {
    try {
        const subscriber = {
            // _id: mongoose.Schema.Types.ObjectId,
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode,
            courses: req.body.courses,
        }
        const result = await SubscriberService.createSubscriber(subscriber);
        res.status(201).json({
            success: true,
            message: `Create ${result.name} successfully!!!`,
            Subscriber: result,
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
        })
    }
}

SubscriberController.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await SubscriberService.getAllSubscribers();
        res.status(200).json({
            success: true,
            message: "Thanh Cong!!!",
            List_Subscribers: subscribers,
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}

SubscriberController.getSubscriberById = async (req, res) => {
    try {
        const id = req.params.id;
        const subscriber = await SubscriberService.getrSubscriberById(id);
        res.status(200).json({
            success: true,
            message: `More on ${subscriber.name}!!! `,
            Subscriber: subscriber,
        })
    } catch (error) {
        res.status(404).json({
            error: error.message,
        })
    }
}

export default SubscriberController;
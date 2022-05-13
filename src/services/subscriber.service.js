import SubscriberModel from "../models/subscriber.model.js";

const SubscriberService = {};

SubscriberService.createSubscriber = async (subscriber) => {
    return await SubscriberModel.create(subscriber);
}

SubscriberService.getAllSubscribers = async () => {
    return await SubscriberModel.find().populate("courses");
}

SubscriberService.getrSubscriberById = async (id) => {
    return await SubscriberModel.findById(id);
}

SubscriberService.updateSubscriber = async(id, subscriber) => {
    return await SubscriberModel.findByIdAndUpdate(id, subscriber);
}

SubscriberService.deleteSubscriber = async (id) => {
    return await SubscriberModel.findByIdAndRemove(id);
}

export default SubscriberService;
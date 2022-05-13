import express from "express";
import SubscriberController from "../controllers/subscriber.controller.js";

const subscriberRouter = express.Router();

subscriberRouter.get("/subscribers", SubscriberController.getAllSubscribers);
subscriberRouter.post("/subscribers", SubscriberController.createSubscriber);
subscriberRouter.get("/subscribers/:id", SubscriberController.getSubscriberById);

export default subscriberRouter;
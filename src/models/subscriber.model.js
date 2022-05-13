import mongoose from "mongoose";

const schema = mongoose.Schema;

const subscriberModel = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
    },
    courses: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "courses" 
    }]
}, {
    timestamps: true
});

const SubscriberModel = mongoose.model("subscribers", subscriberModel);

export default SubscriberModel;
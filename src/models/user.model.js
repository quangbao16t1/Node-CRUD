import mongoose from "mongoose";
import SubscriberModel from "./subscriber.model.js";

const schema = mongoose.Schema;

const userModel = new schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        first: {
            type: String,
            required: true,
            trim: true,
        },
        last: {
            type: String,
            required: true,
            trim: true,
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    zipCode: {
        type: Number,
        min: [1000, "Zip code too shorts"],
        max: [99999],
    },
    password: {
        type: String,
        required: true,
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses"
    }],
    subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "subscribers"
    },
},
    {
        timestamps: true
    });

const UserModel = mongoose.model("users", userModel);

UserModel.virtual("fullName")
    .get(function () {
        return `${this.name.first} ${this.name.last}`;
    });

UserModel.pre("save", function (next) {
    let user = this;
    if (user.subscribedAccount === undefined) {
        SubscriberModel.findOne({
            email: user.email
        })
            .then(subscriber => {
                user.subscribedAccount = subscriber;
                next();
            })
            .catch(error => {
                console.log(`Error in connecting subscriber: ${error.message}`);
                next(error);
            });
    } else {
        next();
    }
});

export default UserModel;


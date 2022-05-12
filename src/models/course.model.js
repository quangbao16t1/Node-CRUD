import mongoose from "mongoose";

const schema = mongoose.Schema;

const courseModel = new schema({
    // _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    maxStudents: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative number of students"]
    },
    cost: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative cost"]
    },

})

const CourseModel = mongoose.model("courses", courseModel);

export default CourseModel;
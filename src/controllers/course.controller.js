import mongoose from "mongoose";
import CourseService from "../services/course.service.js";

const CourseController = {};

// CourseController.getAllCourses = async (req, res) => {
//     const courses = CourseModel.find({}, (err, data) => {
//         if (err) throw err;
//         res.status(200).json({
//             success: true,
//             courses: data,
//         });
//     });
// }

CourseController.createCourse = async (req, res) => {
    const courses = {
        // _id: mongoose.Schema.Types.ObjectId,
        title: req.body.title,
        description: req.body.description,
        maxStudents: req.body.maxStudents,
        cost: req.body.cost
    };

    try {
        const result = await CourseService.createCourse(courses);
        console.log(courses);
        res.status(201).json({
            success: true,
            message: "Created course successfully!!!",
            courses: result,
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
        })
    }
}

CourseController.getAllCourses = async (req, res) => {
    try {
        const courses = await CourseService.getAllCourses();
        res.status(200).json({
            success: true,
            courses: courses,
        });
    } catch (error) {
        res.status(404).json({
            error: error.message,
        })
    }
}

CourseController.getCourseById = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await CourseService.getCourseById(id);
        res.status(200).json({
            success: true,
            message: "Thanh cong!!!",
            Course: course,
        })
    } catch (error) {
        res.status(404).json({
            error: error.message,
        })
    }
}

CourseController.updateCourse = async (req, res) => {
    try {
        const course = {
            title: req.body.title,
            description: req.body.description,
            maxStudents: req.body.maxStudents,
            cost: req.body.cost
        }
        const id = req.params.id;
        const result = await CourseService.updateCourse(id, course);
        res.status(200).json({
            success: true,
            message: "Update thanh cong!!",
            course_update: result
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

CourseController.deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await CourseService.deleteCourse(id);
        res.status(200).json({
            success: true,
            message: "DELETE successfully!!!!!",
            Course: result,
        }) 
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}

export default CourseController;
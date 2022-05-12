import express from "express";
import CourseController from "../controllers/course.controller.js";

const courseRouter = express.Router();

courseRouter.get("/courses", CourseController.getAllCourses);
courseRouter.get("/courses/:id", CourseController.getCourseById);
courseRouter.post("/courses", CourseController.createCourse);
courseRouter.put("/courses/:id", CourseController.updateCourse);
courseRouter.delete("/courses/:id", CourseController.deleteCourse)


export default courseRouter;   
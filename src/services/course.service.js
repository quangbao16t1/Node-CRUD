import CourseModel from "../models/course.model.js";

const CourseService = {};

CourseService.getAllCourses = async () => {
    return await CourseModel.find({});
}

CourseService.updateCourse = async (id, courses) => {
    return await CourseModel.findByIdAndUpdate(id, courses);
}

CourseService.deleteCourse = async (id) => {
    return await CourseModel.findByIdAndRemove(id);
}

CourseService.createCourse = async (courses) => {
    return await CourseModel.create(courses);
}

CourseService.getCourseById = async (id) => {
    return await CourseModel.findById(id);
}

export default CourseService;
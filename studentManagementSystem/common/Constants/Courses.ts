import { ICourse } from "../types.js";

const courses: ICourse[] = [
    { courseId: 1, courseName: "English", classTimings: "monday: 3pm-6pm, thursday: 9am-12pm", startsFrom: "12-Jan-2023", teacher: "Prof. John Doe", tuitionFee: 200 },
    { courseId: 2, courseName: "Maths", classTimings: "tuesday: 3pm-6pm, friday: 9am-12pm", startsFrom: "1-Jan-2023", teacher: "Dr. John Alvarez", tuitionFee: 200 },
    { courseId: 3, courseName: "Physics", classTimings: "monday: 3pm-6pm, tuesday: 9am-12pm", startsFrom: "1-Feb-2023", teacher: "Prof. John Smith", tuitionFee: 200 },
    { courseId: 4, courseName: "Chemistry", classTimings: "wednesday: 3pm-6pm, thursday: 9am-12pm", startsFrom: "3-Jan-2023", teacher: "Dr. Tom Bill", tuitionFee: 200 },
    { courseId: 5, courseName: "Biology", classTimings: "monday: 3pm-6pm", startsFrom: "12-Feb-2023", teacher: "Prof. Oliver Brown", tuitionFee: 200 },
    { courseId: 6, courseName: "Social Studies", classTimings: "monday: 3pm-6pm, thursday: 9am-12pm", startsFrom: "12-Jan-2023", teacher: "Prof. Doe John", tuitionFee: 200 },
    { courseId: 7, courseName: "Psychology", classTimings: "tuesday: 3pm-6pm, friday: 9am-12pm", startsFrom: "1-Jan-2023", teacher: "Dr. Alvarez John", tuitionFee: 200 },
    { courseId: 8, courseName: "Economics", classTimings: "monday: 3pm-6pm, tuesday: 9am-12pm", startsFrom: "1-Feb-2023", teacher: "Prof. Smith John", tuitionFee: 200 },
    { courseId: 9, courseName: "Philosophy", classTimings: "wednesday: 3pm-6pm, thursday: 9am-12pm", startsFrom: "3-Jan-2023", teacher: "Dr. Bill Tom", tuitionFee: 200 },
    { courseId: 10, courseName: "Ethics", classTimings: "monday: 3pm-6pm", startsFrom: "12-Feb-2023", teacher: "Prof. Brown Oliver", tuitionFee: 200 }
];

export default courses;
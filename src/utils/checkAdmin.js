// import { PositionsModel } from "../modules/positions/model.js";

const checkAdmin = (user) => (user.role == "admin" ? true : false);
const checkAssistent = (user) => (user.role == "assistent" ? true : false)
const checkTeacher = (user) => (user.role == "teacher" ? true : false)
const checkStudent = (user) => (user.role == "student" ? true : false)

export { checkAdmin,checkAssistent,checkTeacher,checkStudent};

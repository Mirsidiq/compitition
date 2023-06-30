import auth from "./auth/router.js";
import directions from "./directions/router.js";
import groups from "./groups/router.js";
import users from "./users/router.js";
import assistents from "./assistents/router.js"
import students from "./students/router.js"
import homeworks from "./homeworks/router.js"

export default [
  auth,
  directions,
  groups,
  assistents,
  students,
  homeworks,
  users
];

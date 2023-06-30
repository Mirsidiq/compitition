import Joi from "joi";
const checkId = Joi.object({
  id: Joi.number().integer().required(),
});
const checkPagination = Joi.object({
  limit: Joi.number().integer(),
  page:Joi.number().integer()
});

const checkDirectionBody = Joi.object({
  dir_name: Joi.string().max(60).required(),
  salary: Joi.number().integer().required(),
  duration: Joi.number().integer().required(),
});
const checkDirectionBodyUpdate=Joi.object({
  dir_name: Joi.string().max(60).allow(null),
  salary: Joi.number().integer().allow(null),
  duration: Joi.number().integer().allow(null),
})
const checkGroupsBody = Joi.object({
  dir_ref_id:Joi.number().integer().required(),
  gr_number:Joi.string().max(20).required(),
   teacher:Joi.string().max(64).required(),
   assistent:Joi.number().integer().required(),
   days:Joi.array().items(Joi.string().valid('dushanba','seshanba','chorshanba','payshanba','juma','shanba')).required(),
   start_time:Joi.string().max(10).required(),
   end_time:Joi.string().max(10).required(),
   created_at:Joi.date().allow(null),
   room:Joi.string().max(64).required(), 
});
const checkAssistentBody = Joi.object({
  firstname: Joi.string().max(20).required(),
  lastname: Joi.string().max(20).required(),
  contact: Joi.string().regex(/^\+?[1-9][0-9]{7,11}$/).required(),
  gender: Joi.string().valid('1','2').required(),
  username:Joi.string().required(),
  age:Joi.number().integer().required(),
  dir_ref_id:Joi.number().integer().required(),
});
const checkStudentBody = Joi.object({
  firstname: Joi.string().max(20).required(),
  lastname: Joi.string().max(20).required(),
  contact: Joi.string().regex(/^\+?[1-9][0-9]{7,11}$/).required(),
  gender: Joi.string().valid('1','2').required(),
  username:Joi.string().required(),
  age:Joi.number().integer().required(),
  dir_ref_id:Joi.number().integer().required(),
  gr_ref_id:Joi.number().integer().required(),
});

const UserLoginBody = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
const checkHomeworksBody=Joi.object({
  name:Joi.string().required(),
  desc:Joi.string().required(),
  mark:Joi.number().required(),
  student_ref_id:Joi.number().integer().required()
})
export {
  checkId,
  checkDirectionBody,
  checkDirectionBodyUpdate,
  checkGroupsBody,
  UserLoginBody,
  checkAssistentBody,
  checkStudentBody,
  checkPagination,
  checkHomeworksBody
};

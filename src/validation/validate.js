import Joi from "joi";
const checkId = Joi.object({
  id: Joi.number().integer().required(),
});
const checkDirection = Joi.object({
  directions: Joi.string().max(30),
});
const checkPosition = Joi.object({
  positions: Joi.string().max(30),
});
const checkDepartment = Joi.object({
  center_ref_id: Joi.number().integer().required(),
  dep_name: Joi.string().max(60).required(),
  create_at: Joi.string().max(60).allow(null),
  delete_at: Joi.string().allow(null),
}).required();
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
const checkPositionBody = Joi.object({
  dep_ref_id: Joi.number().integer().required(),
  pos_name: Joi.string().max(60).required(),
  salary: Joi.number().allow(null),
});
const checkGroupsBody = Joi.object({
  dir_ref_id: Joi.number().integer().required(),
  gr_number: Joi.number().integer().required(),
  begin_date: Joi.string().allow(null),
  end_date: Joi.string().allow(null),
});
const checkUsersBody = Joi.object({
  firstname: Joi.string().max(20).required(),
  lastname: Joi.string().max(20).required(),
  contact: Joi.string().max(15).required(),
  gender: Joi.string().required().max(12),
});
const checkAssistentBody = Joi.object({
  firstname: Joi.string().max(20).required(),
  lastname: Joi.string().max(20).required(),
  contact: Joi.string().regex(/^\+?[1-9][0-9]{7,11}$/).required(),
  gender: Joi.string().valid('1','2').required(),
  username:Joi.string().required(),
  age:Joi.number().integer().required(),
  dir_ref_id:Joi.number().integer().required()
});
const checkIncomesBody = Joi.object({
  user_ref_id: Joi.number().integer().required(),
  reason: Joi.string().required(),
  amount: Joi.number().integer().required(),
  inc_time: Joi.string().required(),
});
const checkOutlaysBody = Joi.object({
  reason: Joi.string().required(),
  amount: Joi.number().integer().required(),
  out_time: Joi.string().required(),
});
const UserLoginBody = Joi.object({
  email: Joi.string().required(),
  contact: Joi.string().required(),
});
export {
  checkDepartment,
  checkId,
  checkDirection,
  checkPosition,
  checkDirectionBody,
  checkDirectionBodyUpdate,
  checkPositionBody,
  checkGroupsBody,
  checkUsersBody,
  checkIncomesBody,
  checkOutlaysBody,
  UserLoginBody,
  checkAssistentBody
};

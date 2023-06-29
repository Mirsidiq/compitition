import { customError } from "../exception/customError.js";
import {
  checkId,
  checkDirectionBody,
  checkUsersBody,
  checkPositionBody,
  checkGroupsBody,
  checkIncomesBody,
  checkOutlaysBody,
  UserLoginBody,
  checkDirectionBodyUpdate,
  checkAssistentBody,
  checkPagination,
  checkStudentBody
} from "../validation/validate.js";

const checkParamsId = (req, _, next) => {
  const { error, __ } = checkId.validate(req.params);
  if (error) next(new customError(400, error.message.replaceAll('"', "")));
  next();
};
const checkPaginationMiddleware = (req, _, next) => {
  const { error, __ } = checkPagination.validate(req.query);
  if (error) next(new customError(400, error.message.replaceAll('"', "")));
  next();
};
const checkDirectionBodyMiddleware = (req, _, next) => {
  const { error, __ } = checkDirectionBody.validate(req.body);
  if (error) next(new customError(400, error.message.replaceAll('"', "")));
  next();
};

const checkDirectionBodyUpdateMiddleware = (req, _, next) => {
  const { error, __ } = checkDirectionBodyUpdate.validate(req.body);
  if (error) next(new customError(400, error.message.replaceAll('"', "")));
  next();
};
const checkPositionBodyMiddleware = (req, _, next) => {
  const { error, __ } = checkPositionBody.validate(req.body);
  if (error) next(new customError(400, error.message.replaceAll('"', "")));
  next();
};
const checkAssistentBodyMiddleware = (req, _, next) => {
  const {error,__}=checkAssistentBody.validate(req.body);
  if (error)  next(new customError(400, error.message.replaceAll('"', "")));
  next(); 
}
const checkStudentBodyMiddleware = (req, _, next) => {
  const {error,__}=checkStudentBody.validate(req.body);
  if (error)  next(new customError(400, error.message.replaceAll('"', "")));
  next(); 
}
const checkGroupsBodyMiddleware = (req, _, next) => {
  const { error, __ } = checkGroupsBody.validate(req.body);
  if (error) next(new customError(400, error.message.replaceAll('"', "")));
  next();
};
const checkUsersBodyMiddleware = (req, _, next) => {
  const { error, __ } = checkUsersBody.validate(req.body);
  if (error) next(new customError(400, error.message.replaceAll('"', "")));
  next();
};
const checkIncomesBodyMiddleware = (req, _, next) => {
  const { error, __ } = checkIncomesBody.validate(req.body);
  if (error) next(new customError(400, error.message.replaceAll('"', "")));
  next();
};
const checkOutlaysBodyMiddleware = (req, _, next) => {
  const { error, __ } = checkOutlaysBody.validate(req.body);
  if (error) next(new customError(400, error.message.replaceAll('"', "")));
  next();
};
const UserLoginBodyMiddleware = (req, _, next) => {
  const { error, __ } = UserLoginBody.validate(req.body);
  if (error) next(new customError(400, error.message.replaceAll('"', "")));
  next();
};
export {
  checkParamsId,
  checkDirectionBodyMiddleware,
  checkDirectionBodyUpdateMiddleware,
  checkPositionBodyMiddleware,
  checkGroupsBodyMiddleware,
  checkUsersBodyMiddleware,
  checkIncomesBodyMiddleware,
  checkOutlaysBodyMiddleware,
  UserLoginBodyMiddleware,
  checkAssistentBodyMiddleware,
  checkStudentBodyMiddleware,
  checkPaginationMiddleware
};

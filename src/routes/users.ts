import { checkJwt } from "../middleware/checkJwt";
import { checkValidation } from "../middleware/checkValidation";
import { UserController } from "../modules/v1/user/UserController";

export const UserRoutes = [
  {
    method: "get",
    route: "/v1/users",
    controller: UserController,
    action: "index"
  }, {
    method: "post",
    route: "/v1/users",
    controller: UserController,
    middleware: [checkJwt, checkValidation],
    action: "create"
  },
  {
    method: "get",
    route: "/v1/users/:id",
    controller: UserController,
    action: "show"
  }, {
    method: "patch",
    route: "/v1/users/:id",
    controller: UserController,
    middleware: [checkJwt, checkValidation],
    action: "edit"
  }, {
    method: "delete",
    route: "/v1/users/:id",
    controller: UserController,
    action: "remove"
  }
];

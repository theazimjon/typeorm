import express from 'express';
import {UserController} from "../controller/user.controller";
import authGuard from '../guard/auth.guard';

const router = express.Router();
const userController = new UserController();

router.route('/')
    .get(authGuard, userController.all.bind(userController))
    .post(authGuard, userController.save.bind(userController));

router.post("/signup", userController.signUp.bind(userController));
router.post("/signin", userController.signIn.bind(userController));
router.patch("/change-password",authGuard,  userController.changePassword.bind(userController))
router.delete("/log-out", authGuard, userController.logout.bind(userController))

router.route('/:id')
    .get(authGuard, userController.one.bind(userController))
    .patch(authGuard, userController.update.bind(userController))
    .delete(authGuard, userController.delete.bind(userController));

export default router;

import express from "express";
import {createUser, getUsers, removeUser, updateUser, findByAccountNumber, findByIdentityNumber} from "../controllers/user.controller.js";
import jwtValidation from "../validations/jwt.validation.js";

const router = express.Router();
router.get('/', jwtValidation, getUsers);
router.post('/', jwtValidation, createUser);
router.delete('/:id', jwtValidation, removeUser);
router.put('/:id', jwtValidation, updateUser);
router.get('/accNumber/:accNumber', jwtValidation, findByAccountNumber);
router.get('/idNumber/:idNumber', jwtValidation, findByIdentityNumber);

export default router;

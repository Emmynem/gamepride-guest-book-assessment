import { validationResult, matchedData } from 'express-validator';
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { ServerError, SuccessResponse, ValidationError, NotFoundError, UnauthorizedError, CreationSuccessResponse } from '../common';
import db from "../models";
import { secret } from '../config/auth.config';

const { compareSync } = bycrypt;
const { sign } = jwt;
const Admin = db.admin;
const Guest = db.guest;

export function adminSignin(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Admin.findOne({
            where : { email: payload.email }
        })
        .then(admin => {
            if (!admin) {
                NotFoundError(res, "Admin not found", null);
            } else {
                const passwordIsValid = compareSync(payload.password, admin.password);
                if (!passwordIsValid) {
                    UnauthorizedError(res, "Invalid Password!", null);
                } else {
                    const token = sign({ unique_id: admin.unique_id }, secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    SuccessResponse(res, "Logged in successfully!", { token });
                }
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }

}

export function guestSignUp(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Guest.create({ ...payload, unique_id: uuidv4() })
            .then(guest => {
                const data = {
                    unique_id: guest.unique_id,
                    fullname: guest.firstname + (guest.middlename !== null ? " " + guest.middlename + " " : " ") + guest.lastname,
                    check_in: payload.check_in
                };
                CreationSuccessResponse(res, "Guest registered successfully!", data);
            }).catch(err => {
                ServerError(res, err.message, null);
            });
    }
}

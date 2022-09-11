import { validationResult, matchedData } from 'express-validator';
import bycrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { ServerError, CreationSuccessResponse, SuccessResponse, ConflictError, ValidationError, OtherSuccessResponse, NotFoundError } from '../common';
import db from "../models";

const { hashSync } = bycrypt;
const Admin = db.admin;
const Op = db.Sequelize.Op;

export function getAdmins(req, res) {
    Admin.findAndCountAll({
        attributes: { exclude: ['password', 'id'] },
        where: {
            id: {
                [Op.ne]: 1
            }
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(admins => {
        if (!admins || admins.length == 0) {
            SuccessResponse(res, "Admins Not found", []);
        } else {
            SuccessResponse(res, "Admins loaded", admins);
        }
    }).catch(err => {
        ServerError(res, err.message, null);
    });
};

export function getAdmin(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);
    
        Admin.findOne({
            attributes: { exclude: ['password', 'id'] },
            where: {
                ...payload, 
                id: {
                    [Op.ne]: 1
                } 
            }
        }).then(admin => {
            if (!admin) {
                NotFoundError(res, "Admin not found", null);
            } else {
                SuccessResponse(res, "Admin loaded", admin);
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};

export function addAdmin(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);
    
        Admin.create({ ...payload, unique_id: uuidv4(), password: hashSync(req.body.password, 8) })
        .then(admin => {
            CreationSuccessResponse(res, "Admin was registered successfully!", { unique_id: admin.unique_id });
        }).catch(err => {
            if (err.original.code === 'ER_DUP_ENTRY') {
                ConflictError(res, "Email already exists", null);
            } else {
                ServerError(res, err.original.sqlMessage, null);
            }
        });
    }
}

export function updateAdmin(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);
        
        Admin.update({ ...payload }, {
            where : {
                unique_id: payload.unique_id,
                id: {
                    [Op.ne]: 1
                }
            }
        }).then(data => {
            if (data == 0) {
                NotFoundError(res, "Admin not found", null);
            } else {
                OtherSuccessResponse(res, "Admin details updated successfully!");
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};

export function removeAdmin(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Admin.destroy({
            where: {
                ...payload,
                id: {
                    [Op.ne]: 1
                }
            }
        }).then(data => {
            if (!data) {
                NotFoundError(res, "Admin not found", null);
            } else {
                OtherSuccessResponse(res, "Admin details deleted successfully!");
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};

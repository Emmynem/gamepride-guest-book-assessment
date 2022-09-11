import { validationResult, matchedData } from 'express-validator';
import { ServerError, SuccessResponse, ValidationError, OtherSuccessResponse, NotFoundError } from '../common';
import db from "../models";

const Guest = db.guest;

export function getGuests(req, res) {
    Guest.findAndCountAll({
        attributes: { exclude: ['updatedAt', 'id'] },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(guests => {
        if (!guests || guests.length == 0) {
            SuccessResponse(res, "Guests Not found", []);
        } else {
            SuccessResponse(res, "Guests loaded", guests);
        }
    }).catch(err => {
        ServerError(res, err.message, null);
    });
};

export function getGuest(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Guest.findOne({
            attributes: { exclude: ['id'] },
            where: { ...payload }
        }).then(admin => {
            if (!admin) {
                NotFoundError(res, "Guest not found", null);
            } else {
                SuccessResponse(res, "Guest loaded", admin);
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};

export function removeGuest(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Guest.destroy({
            where: { ...payload }
        }).then(data => {
            if (!data) {
                NotFoundError(res, "Guest not found", null);
            } else {
                OtherSuccessResponse(res, "Guest details deleted successfully!");
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};
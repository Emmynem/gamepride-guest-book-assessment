import { v4 as uuidv4 } from 'uuid';
import bycrypt from "bcryptjs";
import db from "../models";
import { logger } from '../common';

const { hashSync } = bycrypt;
const Admin = db.admin;

export function createAdmin () {

    const details = {
        unique_id: uuidv4(),
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@example.com",
        password: hashSync("John-Doe-1", 8)
    };

    Admin.findOne({ where: { email: details.email } })
    .then(admin => {
        if (!admin) {
            Admin.create(details).then(res => {
                logger.warn('Added admin defaults');
            }).catch(err => {
                logger.error('Error adding admin defaults');
            });
        }
    }).catch(err => {
        logger.error('Error getting default admin');
    });
}
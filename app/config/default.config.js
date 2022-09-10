import { v4 as uuidv4 } from 'uuid';
import bycrypt from "bcryptjs";
import db from "../models";

const { hashSync } = bycrypt;
const Admin = db.admin;

export function createAdmin (dropAndResync) {

    const details = {
        unique_id: uuidv4(),
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@example.com",
        password: hashSync("John-Doe-1", 8)
    }

    if(dropAndResync) {
        Admin.create(details).then(res => {
            return true;
        }).catch(err => {
            return false;
        });
    }
}
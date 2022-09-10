import { check } from 'express-validator';

const validatePhoneNumber = (phoneNumber) => {
    const tester = /^([- +()0-9]{6,15})/;

    if (!phoneNumber)
        return false;
    if (phoneNumber.length > 15)
        return false;

    const valid = tester.test(phoneNumber);

    if (!valid)
        return false;

    return true;
};

const validateDate = (date) => {
    const d = new Date(date);
    const today = new Date();
    if (d == "Invalid Date") return false;
    if (today.getTime() > d.getTime()) return false;
    return true;
};

export const guestRules = {
    forFindingGuest: [
        check('unique_id').exists({ checkNull: true, checkFalsy: true }).withMessage("Unique Id is required")
    ],
    forSignUp: [
        check('firstname').exists({ checkNull: true, checkFalsy: true }).withMessage("Firstname is required"),
        check('firstname').isLength({ min: 3, max: 50 }).withMessage("Invalid length (3 - 50) characters"),
        check('middlename').optional({ checkFalsy: false }).isLength({ min: 3, max: 50 }).withMessage("Invalid length (3 - 50) characters"),
        check('lastname').exists({ checkNull: true, checkFalsy: true }).withMessage("Lastname is required"),
        check('lastname').isLength({ min: 3, max: 50 }).withMessage("Invalid length (3 - 50) characters"),
        check('email').isEmail().withMessage('Invalid email format'),
        check('phone').optional({ checkFalsy: false }).custom((phone) => !!validatePhoneNumber(phone)).withMessage('Invalid phone'),
        check('check_in').exists({ checkNull: true, checkFalsy: true }).withMessage("Check In is required"),
        check('check_in').custom((check_in) => !!validateDate(check_in)).withMessage('Invalid check-in datetime')
    ]
};
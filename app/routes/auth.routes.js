import { adminSignin, guestSignUp } from "../controllers/auth.controller";
import { adminRules } from "../rules/admin.rules";
import { guestRules } from "../rules/guest.rules";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token"
        );
        next();
    });

    // Auth routes -----

    app.post("/api/auth/backoffice/signin", [adminRules.forLogin], adminSignin);

    app.post("/api/guest/signup", [guestRules.forSignUp], guestSignUp);

};
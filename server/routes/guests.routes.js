import authJwt from "../middleware";
import { getGuest, getGuests, removeGuest } from "../controllers/guests.controller";
import { guestRules } from "../rules/guest.rules";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token"
        );
        next();
    });

    // Guest routes -----

    app.get(
        "/api/guests/",
        [authJwt.verifyToken, authJwt.isAdmin],
        getGuests
    );

    app.get(
        "/api/guest/",
        [authJwt.verifyToken, authJwt.isAdmin, guestRules.forFindingGuest],
        getGuest
    );

    app.delete(
        "/api/guest/",
        [authJwt.verifyToken, authJwt.isAdmin, guestRules.forFindingGuest],
        removeGuest
    );

};

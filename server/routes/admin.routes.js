import authJwt from "../middleware";
import { getAdmins, getAdmin, updateAdmin, removeAdmin, addAdmin } from "../controllers/admin.controller";
import { adminRules } from '../rules/admin.rules';

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token"
        );
        next();
    });

    // Admin routes -----

    app.get(
        "/api/backoffice/admins",
        [authJwt.verifyToken, authJwt.isAdmin],
        getAdmins
    );
    app.get(
        "/api/backoffice/admin",
        [
            authJwt.verifyToken, 
            authJwt.isAdmin,
            adminRules.forFindingAdmin
        ],
        getAdmin
    );
    app.post(
        "/api/backoffice/admin",
        [
            authJwt.verifyToken, 
            authJwt.isAdmin,
            adminRules.forAdding
        ],
        addAdmin
    );
    app.put(
        "/api/backoffice/admin",
        [
            authJwt.verifyToken, 
            authJwt.isAdmin,
            adminRules.forUpdating
        ],
        updateAdmin
    );
    app.delete(
        "/api/backoffice/admin",
        [
            authJwt.verifyToken, 
            authJwt.isAdmin,
            adminRules.forFindingAdmin
        ],
        removeAdmin
    );

};
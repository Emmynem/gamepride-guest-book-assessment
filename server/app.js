import express, { json, urlencoded } from "express";
import path from 'path';
import cors from "cors";
import helmet from "helmet";
import { SuccessResponse } from './common';
import morganMiddleware from "./middleware/morgan";
import db from "./models";
import { createAdmin } from './config/default.config';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import guestsRoutes from './routes/guests.routes';
const app = express();

//options for cors midddleware
const options = cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
};

app.use(json({ limit: '100mb' }));
app.use(urlencoded({ extended: true, limit: '100mb' }));
app.use(helmet());
app.use(morganMiddleware);

// add cors
app.use(cors(options));

// simple route
app.get("/", (request, response) => {
    SuccessResponse(response, "Guest Book server activated.");
})

// Sequelize initialization
db.sequelize.sync().then(() => {
    // creating defaults
    createAdmin();
});

app.use(express.static(path.join(__dirname, '../public')));

// Binding routes
adminRoutes(app);
authRoutes(app);
guestsRoutes(app);

// change timezone for app
process.env.TZ = "Africa/Lagos";

export default app;

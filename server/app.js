import express, { json, urlencoded } from "express";
import path from 'path';
import cors from "cors";
import helmet from "helmet";
import { logger, SuccessResponse } from './common';
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
const dropAndResync = false;
db.sequelize.sync({ force: dropAndResync })
.then(() => {
    createAdmin(dropAndResync); 
    if(dropAndResync) logger.warn('Drop and Resync Db with defaults');
});

app.use(express.static(path.join(__dirname, '../public')));

// Binding routes
adminRoutes(app);
authRoutes(app);
guestsRoutes(app);

// // set port, listen for requests
// const PORT = process.env.PORT || 808;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`)
// })

export default app;

import {config} from "dotenv";
import express from "express";
import http from "http";
import {UserController} from "./controlers/user.controller";
import {ReservationController} from "./controlers/reservation.controller";
import {PurchaseController} from "./controlers/purchase.controller";
import {PaymentController} from "./controlers/payment.controller";



config();

async function startServer(): Promise<void> {

    const db = require('./utils/mysql.connector');
    db.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        }).catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });
    const port = process.env.PORT || 3000;
    const app = express();
    const httpServer = http.createServer(app);
    const io = require('socket.io')(httpServer, {
        cors: {origin: process.env.FRONT_URL}
    });

    let cors = require('cors');
    app.use(cors({origin: process.env.FRONT_URL}));

    const userController = new UserController();
    app.use('/user', userController.buildRoutes());

    const reservationController = new ReservationController();
    app.use('/reservation', reservationController.buildRoutes());

    const purchaseController = new PurchaseController();
    app.use('/purchase', purchaseController.buildRoutes());

    const paymentController = new PaymentController();
    app.use('/payment', paymentController.buildRoutes());

    httpServer.listen(port, () => console.log(`Listening on port ${port}`));
}

startServer().catch(console.error);

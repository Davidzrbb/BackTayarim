import express, {Request, Response, Router} from "express";
import {ReservationService} from "../services/reservation.service";
import {checkUserConnected} from "../middleware/checkUserConnected";

export class ReservationController {

    async createReservation(req: Request, res: Response) {
        try {
            const reservation = await ReservationService.getInstance().createReservation({
                name: req.body.name,
                dateStarted: req.body.dateStarted,
                dateEnded: req.body.dateEnded,
                amount: req.body.amount
            });
            res.send({
                response: true,
                reservation: reservation
            });
        } catch (err) {
            console.log(err);
            let message = "" + err;
            res.status(400).send({
                response: false,
                message: message
            });
        }
    }

    async getAllReservation(req: Request, res: Response) {
        try {
            const reservation = await ReservationService.getInstance().getAllReservation();
            res.send({
                response: true,
                reservation: reservation
            });
        } catch (err) {
            console.log(err);
            let message = "" + err;
            res.status(400).send({
                response: false,
                message: message
            });
        }
    }

    //delete reservation
    async deleteReservation(req: Request, res: Response) {
        try {
            const reservation = await ReservationService.getInstance().deleteReservation(parseInt(req.params.idReservation));
            res.send({
                response: true,
                reservation: reservation
            });
        } catch (err) {
            console.log(err);
            let message = "" + err;
            res.status(400).send({
                response: false,
                message: message
            });
        }
    }

    async updateReservation(req: Request, res: Response) {
        try {
            const reservation = await ReservationService.getInstance().updateReservation(parseInt(req.params.idReservation), {
                name: req.body.name,
                dateStarted: req.body.dateStarted,
                dateEnded: req.body.dateEnded,
                amount: req.body.amount
            });
            res.send({
                response: true,
                reservation: reservation
            });
        } catch (err) {
            console.log(err);
            let message = "" + err;
            res.status(400).send({
                response: false,
                message: message
            });
        }
    }

    async getReservationById(req: Request, res: Response) {
        try {
            const reservation = await ReservationService.getInstance().getReservationById(parseInt(req.params.idReservation));
            res.send({
                response: true,
                reservation: reservation
            });
        } catch (err) {
            console.log(err);
            let message = "" + err;
            res.status(400).send({
                response: false,
                message: message
            });
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.post('/create', express.json(), this.createReservation.bind(this));
        router.get('/getAll', express.json(), this.getAllReservation.bind(this));
        router.delete('/delete/:idReservation', express.json(), this.deleteReservation.bind(this));
        router.put('/update/:idReservation', express.json(), this.updateReservation.bind(this));
        router.get('/getById/:idReservation', express.json(), this.getReservationById.bind(this));
        return router;
    }
}
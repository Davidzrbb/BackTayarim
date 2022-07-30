import express, {Request, Response, Router} from "express";
import {PurchaseService} from "../services/purchase.service";
import {PaymentService} from "../services/payment.service";
import {Payment} from "../models/Payment";


export class PaymentController {

    async createPayment(req: Request, res: Response) {
        try {
            const purchase = await PaymentService.getInstance().createPayement({
                amount: req.body.amount,
                datePayment: req.body.datePayment,
                idReservation: req.body.idReservation,
                userSend: req.body.userSend,
                userReceipt: req.body.userReceipt,
            });
            res.send({
                response: true,
                purchase: purchase
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

    async getAllPayment(req: Request, res: Response) {
        try {
            const payment = await PaymentService.getInstance().getAllPayment();
            res.send({
                response: true,
                purchase: payment
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

    async deletePayment(req: Request, res: Response) {
        try {
            const payment = await PaymentService.getInstance().deletePayment(parseInt(req.params.idPayment));
            res.send({
                response: true,
                purchase: payment
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

    async updatePayment(req: Request, res: Response) {
        try {
            const purchase = await PaymentService.getInstance().updatePayment(parseInt(req.params.idPayment), {
                amount: req.body.amount,
                datePayment: req.body.datePayment,
                idReservation: req.body.idReservation,
                userSend: req.body.userSend,
                userReceipt: req.body.userReceipt,
            });
            res.send({
                response: true,
                purchase: purchase
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

    async getPaymentById(req: Request, res: Response) {
        try {
            const purchase = await PurchaseService.getInstance().getPurchaseById(parseInt(req.params.idPayment));
            res.send({
                response: true,
                purchase: purchase
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

    async getTotal(req: Request, res: Response) {
        try {
            const total = await PaymentService.getInstance().getTotal();
            res.send({
                response: true,
                total: total
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
        router.post('/create', express.json(), this.createPayment.bind(this));
        router.get('/getAll', express.json(), this.getAllPayment.bind(this));
        router.delete('/delete/:idPayment', express.json(), this.deletePayment.bind(this));
        router.put('/update/:idPayment', express.json(), this.updatePayment.bind(this));
        router.get('/getById/:idPayment', express.json(), this.getPaymentById.bind(this));
        router.get('/getTotal', express.json(), this.getTotal.bind(this));
        return router;
    }
}
import express, {Request, Response, Router} from "express";
import {PurchaseService} from "../services/purchase.service";


export class PurchaseController {
    async createPurchase(req: Request, res: Response) {
        try {
            const purchase = await PurchaseService.getInstance().createPurchase({
                amount: req.body.amount,
                datePurchase: req.body.datePurchase,
                name: req.body.name,
                idReservation: req.body.idReservation,
                image: req.body.image
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

    async getAllPurchase(req: Request, res: Response) {
        try {
            const purchase = await PurchaseService.getInstance().getAllPurchase();
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

    async deletePurchase(req: Request, res: Response) {
        try {
            const purchase = await PurchaseService.getInstance().deletePurchase(parseInt(req.params.idPurchase));
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

    async updatePurchase(req: Request, res: Response) {
        try {
            const purchase = await PurchaseService.getInstance().updatePurchase(parseInt(req.params.idPurchase), {
                amount: req.body.amount,
                datePurchase: req.body.datePurchase,
                name: req.body.name,
                idReservation: req.body.idReservation,
                image: req.body.image
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

    async getPurchaseById(req: Request, res: Response) {
        try {
            const purchase = await PurchaseService.getInstance().getPurchaseById(parseInt(req.params.idPurchase));
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

    buildRoutes(): Router {
        const router = express.Router();
        router.post('/create', express.json(), this.createPurchase.bind(this));
        router.get('/getAll', express.json(), this.getAllPurchase.bind(this));
        router.delete('/delete/:idPurchase', express.json(), this.deletePurchase.bind(this));
        router.put('/update/:idPurchase', express.json(), this.updatePurchase.bind(this));
        router.get('/getById/:idPurchase', express.json(), this.getPurchaseById.bind(this));
        return router;
    }
}
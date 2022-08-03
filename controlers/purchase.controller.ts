import express, {Request, Response, Router} from "express";
import {PurchaseService} from "../services/purchase.service";
import {checkUserConnected} from "../middleware/checkUserConnected";

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


declare global {
    namespace Express {
        interface Request {
            file: any;
        }
    }
}

export class PurchaseController {

    async createPurchase(req: Request, res: Response) {
        let filename = "";
        if (req.file) {
            filename = PurchaseService.getInstance().getRandomFileName().toString();
            fs.writeFile('./images/' + filename, req.file.buffer, (err: any) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            })
            filename = './images/' + filename;
        }
        try {
            const purchase = await PurchaseService.getInstance().createPurchase({
                amount: req.body.amount,
                datePurchase: req.body.datePurchase,
                name: req.body.name,
                idReservation: req.body.idReservation,
                image: filename
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
            //recuperation de l'image
            for (let i = 0; i < purchase.length; i++) {
                if (purchase[i].image != "" && purchase[i].image != null) {
                    purchase[i].image = fs.readFileSync(purchase[i].image);
                    purchase[i].image = purchase[i].image.toString('base64');
                }
            }

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
        router.post('/create', checkUserConnected(), upload.single('image'), this.createPurchase.bind(this));
        router.get('/getAll', checkUserConnected(), express.json(), this.getAllPurchase.bind(this));
        router.delete('/delete/:idPurchase', checkUserConnected(), express.json(), this.deletePurchase.bind(this));
        router.put('/update/:idPurchase', checkUserConnected(), express.json(), this.updatePurchase.bind(this));
        router.get('/getById/:idPurchase', checkUserConnected(), express.json(), this.getPurchaseById.bind(this));
        return router;
    }
}
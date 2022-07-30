import {Purchase} from "../models/Purchase";
import {Payment} from "../models/Payment";

const Reservation = require('../models/Reservation');

export class PaymentService {

    private static instance?: PaymentService;

    public static getInstance(): PaymentService {
        if (PaymentService.instance === undefined) {
            PaymentService.instance = new PaymentService();
        }
        return PaymentService.instance;
    }

    private constructor() {
    }


    async createPayement(param: { idReservation: any; amount: any; userReceipt: any; userSend: any; datePayment: any }) {
        if (param.idReservation === undefined || param.amount === undefined || param.userReceipt === undefined || param.userSend === undefined || param.datePayment === undefined) {
            throw new Error("Missing parameters");
        }
        if (param.idReservation.length === 0 || param.amount.length === 0 || param.userReceipt.length === 0 || param.userSend.length === 0 || param.datePayment.length === 0) {
            throw new Error("Missing parameters");
        }
        if (param.idReservation.length > 50 || param.amount.length > 50 || param.userReceipt.length > 50 || param.userSend.length > 50 || param.datePayment.length > 50) {
            throw new Error("Too long parameters");
        }
        if (param.idReservation.match(/[^a-zA-Z\d]/g) || param.amount.match(/[^a-zA-Z\d]/g) || param.userReceipt.match(/[^a-zA-Z\d]/g) || param.userSend.match(/[^a-zA-Z\d]/g) || param.datePayment.match(/[^a-zA-Z\d]/g)) {
            throw new Error("Invalid parameters");
        }

        if (await Reservation.findOne({where: {id: param.idReservation}})) {
            throw new Error("Reservation not found");
        }

        return await Purchase.create({
            idReservation: param.idReservation,
            amount: param.amount,
            userReceipt: param.userReceipt,
            userSend: param.userSend,
            datePayment: param.datePayment
        });
    }

    async getAllPayment() {
        return await Payment.findAll();
    }

    async deletePayment(idPayement: number) {
        if (await Payment.findOne({where: {id: idPayement}})) {
            throw new Error("Payment not found");
        }
        return await Payment.destroy({where: {id: idPayement}});
    }

    async updatePayment(idPayement: number, param2: { idReservation: any; amount: any; userReceipt: any; userSend: any; datePayment: any }) {
        if (await Payment.findOne({where: {id: idPayement}})) {
            throw new Error("Payment not found");
        }
        return await Purchase.update({
            idReservation: param2.idReservation,
            amount: param2.amount,
            userReceipt: param2.userReceipt,
            userSend: param2.userSend,
            datePayment: param2.datePayment
        }, {where: {id: idPayement}});
    }

    async getTotal() {
        const total = await Payment.findAll();
        let sum = 0;
        for (let i = 0; i < total.length; i++) {
            sum += total[i].amount;
        }
        const totalPurchase = await Purchase.findAll();
        let sumPurchase = 0;
        for (let i = 0; i < totalPurchase.length; i++) {
            sumPurchase += totalPurchase[i].amount;
        }
        return sum - sumPurchase;
    }
}
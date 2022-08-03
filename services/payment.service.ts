const Purchase = require('../models/Purchase');
const Payment = require('../models/Payment');
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
        console.log(param);
        if (param.amount === undefined || param.userReceipt === undefined || param.userSend === undefined || param.datePayment === undefined) {
            throw new Error("Missing parameters");
        }
        if (param.amount.length === 0 || param.userReceipt.length === 0 || param.userSend.length === 0 || param.datePayment.length === 0) {
            throw new Error("Missing parameters");
        }
        if (param.amount.length > 50 || param.userReceipt.length > 50 || param.userSend.length > 50 || param.datePayment.length > 50) {
            throw new Error("Too long parameters");
        }
        if (param.amount.match(/[^a-zA-Z\d]/g) || param.userReceipt.match(/[^a-zA-Z\d]/g) || param.userSend.match(/[^a-zA-Z\d]/g)) {
            throw new Error("Invalid parameters");
        }

        if (param.idReservation != 0) {
            if (!await Reservation.findOne({where: {idReservation: param.idReservation}})) {
                throw new Error("Reservation not found");
            }
        } else {
            param.idReservation = null;
        }

        param.datePayment = new Date(param.datePayment).setDate(new Date(param.datePayment).getDate() + 1);

        return await Payment.create({
            idReservation: param.idReservation,
            amount: param.amount,
            userReceipt: param.userReceipt.toLowerCase(),
            userSend: param.userSend.toLowerCase(),
            datePayment: param.datePayment
        });
    }

    async getAllPayment() {
        return await Payment.findAll();
    }

    async deletePayment(idPayment: number) {
        if (!await Payment.findOne({where: {idPayment: idPayment}})) {
            throw new Error("Payment not found");
        }
        return await Payment.destroy({where: {idPayment: idPayment}});
    }

    async updatePayment(idPayement: number, param2: { idReservation: any; amount: any; userReceipt: any; userSend: any; datePayment: any }) {
        if (await Payment.findOne({where: {id: idPayement}})) {
            throw new Error("Payment not found");
        }
        return await Payment.update({
            idReservation: param2.idReservation,
            amount: param2.amount,
            userReceipt: param2.userReceipt,
            userSend: param2.userSend,
            datePayment: param2.datePayment
        }, {where: {id: idPayement}});
    }

    async getTotal() {

        const total = await Payment.findAll({where: {userReceipt: "yaron"}});
        let sum = 0;
        for (let i = 0; i < total.length; i++) {
            sum += total[i].amount;
        }

        const totalPurchase = await Purchase.findAll();
        let sumPurchase = 0;
        for (let i = 0; i < totalPurchase.length; i++) {
            sumPurchase += totalPurchase[i].amount;
        }

        const totalPayment = await Payment.findAll({where: {userSend: "yaron"}});

        let sumPayment = 0;
        for (let i = 0; i < totalPayment.length; i++) {
            sumPayment += totalPayment[i].amount;
        }
        return sum - (sumPurchase + sumPayment);
    }
}
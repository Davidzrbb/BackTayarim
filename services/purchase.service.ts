import {Purchase} from "../models/Purchase";

const Reservation = require('../models/Reservation');

export class PurchaseService {

    private static instance?: PurchaseService;

    public static getInstance(): PurchaseService {
        if (PurchaseService.instance === undefined) {
            PurchaseService.instance = new PurchaseService();
        }
        return PurchaseService.instance;
    }

    private constructor() {
    }

    async createPurchase(param: { idReservation: any; image: any; amount: any; name: any; datePurchase: any }) {
        if (param.idReservation === undefined || param.image === undefined || param.amount === undefined || param.name === undefined || param.datePurchase === undefined) {
            throw new Error("Missing parameters");
        }
        if (param.idReservation.length === 0 || param.image.length === 0 || param.amount.length === 0 || param.name.length === 0 || param.datePurchase.length === 0) {
            throw new Error("Missing parameters");
        }
        if (param.idReservation.length > 50 || param.image.length > 50 || param.amount.length > 50 || param.name.length > 50 || param.datePurchase.length > 50) {
            throw new Error("Too long parameters");
        }
        if (param.idReservation.match(/[^a-zA-Z\d]/g) || param.image.match(/[^a-zA-Z\d]/g) || param.amount.match(/[^a-zA-Z\d]/g) || param.name.match(/[^a-zA-Z\d]/g) || param.datePurchase.match(/[^a-zA-Z\d]/g)) {
            throw new Error("Invalid parameters");
        }

        if (await Reservation.findOne({where: {id: param.idReservation}})) {
            throw new Error("Reservation not found");
        }

        return await Purchase.create({
            idReservation: param.idReservation,
            image: param.image,
            amount: param.amount,
            name: param.name,
            datePurchase: param.datePurchase
        });

    }

    async getAllPurchase() {
        return await Purchase.findAll();
    }

    async deletePurchase(idPurchase: number) {
        if (await Purchase.findOne({where: {id: idPurchase}})) {
            throw new Error("Purchase not found");
        }
        return await Purchase.destroy({where: {id: idPurchase}});
    }

    async updatePurchase(idPurchase: number, param: {idReservation: any; image: any; amount: any; name: any; datePurchase: any}) {
        if (await Purchase.findOne({where: {id: idPurchase}})) {
            throw new Error("Purchase not found");
        }
        if (param.idReservation === undefined || param.image === undefined || param.amount === undefined || param.name === undefined || param.datePurchase === undefined) {
            throw new Error("Missing parameters");
        }
        if (param.idReservation.length === 0 || param.image.length === 0 || param.amount.length === 0 || param.name.length === 0 || param.datePurchase.length === 0) {
            throw new Error("Missing parameters");
        }
        if (param.idReservation.length > 50 || param.image.length > 50 || param.amount.length > 50 || param.name.length > 50 || param.datePurchase.length > 50) {
            throw new Error("Too long parameters");
        }
        if (param.idReservation.match(/[^a-zA-Z\d]/g) || param.image.match(/[^a-zA-Z\d]/g) || param.amount.match(/[^a-zA-Z\d]/g) || param.name.match(/[^a-zA-Z\d]/g) || param.datePurchase.match(/[^a-zA-Z\d]/g)) {
            throw new Error("Invalid parameters");
        }
        return await Purchase.update({
            idReservation: param.idReservation,
            image: param.image,
            amount: param.amount,
            name: param.name,
            datePurchase: param.datePurchase
        }, {where: {id: idPurchase}});
    }

    async getPurchaseById(idPurchase: number) {
        if (await Purchase.findOne({where: {id: idPurchase}})) {
            throw new Error("Purchase not found");
        }
        return await Purchase.findOne({where: {id: idPurchase}});
    }
}
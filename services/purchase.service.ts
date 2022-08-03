import path from "path";

const Purchase = require('../models/Purchase');

const Reservation = require('../models/Reservation');
const fs = require('fs');
import {Blob} from 'buffer';

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

    async createPurchase(param: { idReservation: string; image: any; amount: string; name: string; datePurchase: any }) {
        let amount = parseInt(param.amount);
        let idReservation: any = parseInt(param.idReservation);

        if (param.image === undefined || param.amount === undefined || param.name === undefined || param.datePurchase === undefined) {
            throw new Error("Missing parameters");
        }
        if (param.amount.length === 0 || param.name.length === 0) {
            throw new Error("Missing parameters");
        }
        if (param.idReservation.length > 50 || param.amount.length > 50 || param.name.length > 50) {
            throw new Error("Too long parameters");
        }
        if (param.amount.trim().match(/[^a-zA-Z\d]/g)) {
            throw new Error("Invalid parameters");
        }
        if (idReservation) {
            if (!await Reservation.findOne({where: {idReservation: idReservation}})) {
                throw new Error("Reservation not found");
            }
        } else {
            idReservation = null;
        }
        param.datePurchase = new Date(param.datePurchase).setDate(new Date(param.datePurchase).getDate() + 1);
        return await Purchase.create({
            idReservation: idReservation,
            image: param.image,
            amount: amount,
            name: param.name,
            datePurchase: param.datePurchase
        });
    }

    async getAllPurchase() {
        return await Purchase.findAll();
    }

    async deletePurchase(idPurchase: number) {
        if (!await Purchase.findOne({where: {idPurchase: idPurchase}})) {
            throw new Error("Purchase not found");
        }
        //destroy image
        let purchase = await Purchase.findOne({where: {idPurchase: idPurchase}});
        if (purchase.image !== null) {
            fs.unlinkSync(purchase.image);
        }
        return await Purchase.destroy({where: {idPurchase: idPurchase}});
    }

    async updatePurchase(idPurchase: number, param: { idReservation: any; image: any; amount: any; name: any; datePurchase: any }) {
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

    getRandomFileName() {
        let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        let random = ("" + Math.random()).substring(2, 8);
        return timestamp + random;
    }
}
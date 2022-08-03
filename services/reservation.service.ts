
const Payment = require('../models/Payment');
const Purchase = require('../models/Purchase');

const Reservation = require('../models/Reservation');

export class ReservationService {

    private static instance?: ReservationService;

    public static getInstance(): ReservationService {
        if (ReservationService.instance === undefined) {
            ReservationService.instance = new ReservationService();
        }
        return ReservationService.instance;
    }

    private constructor() {
    }

    public async createReservation(reservation: typeof Reservation): Promise<typeof Reservation> {
        console.log(reservation);
        if (reservation.name === undefined || reservation.dateStarted === undefined || reservation.dateEnded === undefined || reservation.amount === undefined) {
            throw new Error("Missing parameters");
        }

        if (reservation.name.match(/[^a-zA-Z\d]/g) || reservation.amount.match(/[^a-zA-Z\d]/g)) {
            throw new Error("Invalid parameters");
        }
        if (reservation.amount < 0) {
            throw new Error("Invalid amount");
        }
        if (reservation.dateStarted > reservation.dateEnded) {
            throw new Error("Invalid date");
        }
        if (await Reservation.findOne({where: {name: reservation.name}})) {
            throw new Error("Name reservation already exists");
        }

        reservation.dateStarted = new Date(reservation.dateStarted).setDate(new Date(reservation.dateStarted).getDate() + 1);
        reservation.dateEnded = new Date(reservation.dateEnded).setDate(new Date(reservation.dateEnded).getDate() + 1);


        if (await Reservation.findOne({
            where: {
                name: reservation.name,
                dateStarted: reservation.dateStarted,
                dateEnded: reservation.dateEnded
            }
        })) {
            throw new Error("Reservation already exists");
        }
        reservation.createdAt = new Date();
        reservation.updatedAt = new Date();

        return await Reservation.create(reservation);
    }

    async getAllReservation() {
        return await Reservation.findAll();
    }

    async deleteReservation(idReservation: number) {
        if (idReservation === undefined) {
            throw new Error("Missing parameters");
        }
        //si un achat est associé à cette réservation, on ne peut pas supprimer la réservation
        if (await Purchase.findOne({where: {idReservation: idReservation}})) {
            throw new Error("Vous devez déjà supprimer les achats associés à cette réservation");
        }
        if (await Payment.findOne({where: {idReservation: idReservation}})) {
            throw new Error("Vous devez déjà supprimer les virements associés à cette réservation");
        }

        if (!await Reservation.findOne({where: {idReservation: idReservation}})) {
            throw new Error("Reservation not found");
        }
        return await Reservation.destroy({
            where: {
                idReservation: idReservation
            }
        });

    }

    async updateReservation(idReservation: number, update: { amount: any; dateStarted: any; dateEnded: any; name: any }) {
        if (update.amount === undefined || update.dateStarted === undefined || update.dateEnded === undefined || update.name === undefined) {
            throw new Error("Missing parameters");
        }
        if (update.amount.match(/[^a-zA-Z\d]/g) || update.dateStarted.match(/[^a-zA-Z\d]/g) || update.dateEnded.match(/[^a-zA-Z\d]/g) || update.name.match(/[^a-zA-Z\d]/g)) {
            throw new Error("Invalid parameters");
        }
        if (update.amount < 0) {
            throw new Error("Invalid amount");
        }
        if (update.dateStarted > update.dateEnded) {
            throw new Error("Invalid date");
        }
        return await Reservation.update(update, {
            where: {
                id: idReservation
            }
        });
    }

    async getReservationById(idReservation: number) {
        if (idReservation === undefined) {
            throw new Error("Missing parameters");
        }
        return await Reservation.findOne({
            where: {
                id: idReservation
            }
        });
    }
}
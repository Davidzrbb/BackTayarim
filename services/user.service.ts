import {SecurityUtils} from "../utils";

const Session = require('../models/Session');
const User = require('../models/User');

export class UserService {

    private static instance?: UserService;

    public static getInstance(): UserService {
        if (UserService.instance === undefined) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    private constructor() {
    }


    async connexionUser(param: typeof User): Promise<typeof User> {
        if (param.login === undefined || param.password === undefined) {
            throw new Error("Missing parameters");
        }
        if (param.login.length === 0 || param.password.length === 0) {
            throw new Error("Missing parameters");
        }
        if (param.login.length > 50 || param.password.length > 50) {
            throw new Error("Too long parameters");
        }
        if (param.login.match(/[^a-zA-Z\d]/g)) {
            throw new Error("Invalid parameters");
        }
        const user = await User.findOne({where: {login: param.login, password: SecurityUtils.sha512(param.password)}});
        if (!user) {
            throw new Error("User not found");
        }
        let token = await this.createSession(user);
        if (!token) {
            throw new Error("Error in insert session");
        }
        return {user: user, token: token.token};
    }

    async createSession(user: typeof User): Promise<typeof Session> {
        return await Session.create({
            idUser: user.idUser,
            token: SecurityUtils.sha512(user.login + user.password + new Date().getTime()),
            expiration: new Date().getTime() + (1000 * 60 * 60 * 24 * 7),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    async getUserByToken(token: string) {
        const session = await Session.findOne({where: {token: token}});
        if (!session) {
            return undefined;
        }
        if (session.expiration < new Date().getTime()) {
            return undefined;
        }
        return await User.findOne({where: {idUser: session.idUser}});
    }

    getUserById(id: number) {
        if (id === undefined) {
            throw new Error("Missing parameters");
        }
        return User.findOne({where: {idUser: id}});
    }
}
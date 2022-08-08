"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = exports.createUsers = void 0;
const config_1 = require("../Config/config");
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { username, email } = req.body;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        if (pool.connected) {
            console.log("Connected");
        }
        yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .input("username", mssql_1.default.VarChar, username)
            .input("email", mssql_1.default.VarChar, email)
            .execute('createUsers');
        console.log(req.body);
        res.json({ message: "succesfully inserted" });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.createUsers = createUsers;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const users = yield pool.request().execute('getUsers');
        const { recordset } = users;
        res.json(recordset);
    }
    catch (error) {
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const users = yield pool
            .request()
            .input('username', mssql_1.default.VarChar, username)
            .execute('getUser');
        const { recordset } = users;
        if (!users.recordset[0]) {
            res.json({ message: 'user not found' });
        }
        else {
        }
        res.json(recordset);
    }
    catch (error) {
    }
});
exports.getUser = getUser;

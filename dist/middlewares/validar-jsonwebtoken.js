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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario = require('../models/usuario');
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No se ha proporcionado un token de acceso',
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRETKEY);
        const usuario = yield Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - el usuario no existe'
            });
        }
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.estado)) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado eliminado'
            });
        }
        req.usuario = usuario;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido',
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jsonwebtoken.js.map
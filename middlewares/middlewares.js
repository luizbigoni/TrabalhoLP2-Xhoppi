import express from 'express';
import __dirname from '../utils/pathUtils.js'
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import jwt from 'jsonwebtoken';

//Middlewares
const staticMiddleware = express.static(path.join(__dirname, 'assets'));

const urlencodedMiddleware = express.urlencoded({ extended: true});
const jsonMiddleware = express.json();

const securityMiddleware = helmet();

const compressionMiddlewware = compression();

const rateLimitMiddleware = rateLimit({
    windowMs: 10 * 60 * 1000,  // 10 minutos
    max: 100,                  // Limita cada IP a 50 requisições por janela
    message: 'Muitas requisições, tente novamente em 10 minutos.'
});

const logFile = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'}); 
const morganMiddleware = morgan('combined', { stream: logFile});

//METODO DE LOGIN - JWT
const SEGREDO_JWT = 'uma_senha_super_secreta_para_o_projeto_xhopii'; // Use a mesma senha do seu Controller

const authMiddleware = (req, res, next) => {
    // Tenta pegar o token que foi salvo nos cookies durante o login
    const token = req.cookies.token;

    // Se não tiver token, significa que o usuário não fez login
    if (!token) {
        return res.redirect('/login'); // Manda de volta pra tela de login
    }

    try {
        // Se tem token, vamos verificar se ele é válido e não expirou
        const decodificado = jwt.verify(token, SEGREDO_JWT);
        
        // Guardamos os dados do cliente decodificado dentro do req 
        // para podermos usar nos controllers depois, se precisarmos
        req.clienteLogado = decodificado;
        
        // Tudo certo! Pode deixar a requisição passar para o Controller
        next(); 
    } catch (error) {
        // Se o token for inválido (ou expirou após 1h), limpamos o cookie falso/vencido
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

export {
    staticMiddleware,
    urlencodedMiddleware,
    jsonMiddleware,
    securityMiddleware,
    compressionMiddlewware,
    rateLimitMiddleware,
    morganMiddleware,
    authMiddleware
};

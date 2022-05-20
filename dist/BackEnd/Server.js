"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const SocketIO_1 = __importDefault(require("./Utils/SocketIO"));
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = __importDefault(require("./graphql/resolvers/resolvers"));
const schemas_1 = __importDefault(require("./graphql/schemas/schemas"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const videoRoute_1 = __importDefault(require("./routes/videoRoute"));
const cloudinary = require('cloudinary').v2;
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = __importDefault(require("./Utils/dbConnect"));
const isAdmin_1 = __importDefault(require("./middleware/isAdmin"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
(0, dbConnect_1.default)();
app
    .prepare()
    .then(async () => {
    const server = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(server);
    httpServer.listen(PORT, () => {
        console.log(`> Ready on ${PORT}`);
    });
    server.use(express_1.default.json({ limit: '25mb' }));
    server.use(express_1.default.urlencoded({ extended: true, limit: '25mb' }));
    console.log(path_1.default.join(__dirname, '/assets'));
    server.use(express_1.default.static(path_1.default.join(__dirname, '/assets')));
    // cloudinary for Image storing
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_SECRET,
        secure: true,
    });
    //Apollo for GrapqhQL
    const apollo_server = new apollo_server_express_1.ApolloServer({
        typeDefs: schemas_1.default,
        resolvers: resolvers_1.default,
    });
    await apollo_server.start();
    apollo_server.applyMiddleware({ app: server, path: '*/api/graphql' });
    //JWT Auth
    server.use((0, cookie_parser_1.default)());
    server.use('/auth', authRoute_1.default);
    //Socket IO
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => (0, SocketIO_1.default)(socket, io));
    server.use('/video', videoRoute_1.default);
    server.get('/admin*', isAdmin_1.default, (req, res) => {
        return handle(req, res);
    });
    server.get('*', (req, res) => {
        return handle(req, res);
    });
})
    .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});

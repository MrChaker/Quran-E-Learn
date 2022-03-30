import express from "express";
import next from "next";
import cookieparser from "cookie-parser"

import {Server, Socket} from 'socket.io'
import { createServer } from 'http'
import SocketIO from "./Utils/SocketIO";

import { ApolloServer } from "apollo-server-express"
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schemas";

import authRoutes from "./routes/authRoute";

const cloudinary = require( 'cloudinary').v2;

import dotenv from 'dotenv';
import Connect from './Utils/dbConnect'
import CheckAdmin from "./middleware/isAdmin";

dotenv.config();
const PORT = process.env.PORT || 8000 ;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

Connect();
app
  .prepare()
  .then( async () => {
    const server = express();
    const httpServer = createServer(server);

    httpServer.listen(PORT, () => {
        console.log(`> Ready on ${PORT}`);
    });
    server.use(express.json({limit: '25mb'}));
    server.use(express.urlencoded({extended: true, limit: '25mb'}));
    
    // cloudinary for Image storing
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_SECRET,
      secure: true,
    });

    //Apollo for GrapqhQL
    const apollo_server = new ApolloServer({
      typeDefs,
      resolvers
    });
    await apollo_server.start();
    apollo_server.applyMiddleware({app: server, path: "*/api/graphql"});
    
    //JWT Auth
    server.use(cookieparser());
    server.use("/auth", authRoutes );
    
    //Socket IO
    const io = new Server(httpServer, {
      cors:{
        origin: "*",
        methods: ["GET", "POST"]
      }
    })  
    io.on("connection", (socket: Socket)=>SocketIO(socket, io))
  
    server.get("/admin*", CheckAdmin, (req: any, res: any) => {
      return handle(req, res);
    });
    server.get("*", (req: any, res: any) => {
      return handle(req, res);
    });

    
  })
  .catch((ex: any ) => {
    console.error(ex.stack);
    process.exit(1);
  });
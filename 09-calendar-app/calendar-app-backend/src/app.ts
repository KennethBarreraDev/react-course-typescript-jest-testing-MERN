import { DatabaseConnector } from "./infraestructure/database/mongoose/connection/mongo_database_connection"
import { enviromentConfig } from "./infraestructure/envs/enviroment"
import { JWTService } from "./infraestructure/helpers/jwt_service"
import { MongoEventRepository } from "./infraestructure/repositories/MongoEventRepository"
import { MongoUserRepository } from "./infraestructure/repositories/MongoUserRepository"
import { HttpServer } from "./infraestructure/server/http_server"
import { AppRoutes } from "./interfaces/routes/app_routes"

const startServer = async ()=>{
    await new DatabaseConnector().connectToDatabase(enviromentConfig.mongoURL)  
    const userRepository =  new MongoUserRepository();
    const eventRepository = new MongoEventRepository();
    const jwtService = new JWTService(enviromentConfig.jwtSecret);

    await new HttpServer(new AppRoutes(jwtService, enviromentConfig.jwtSecret ,userRepository, eventRepository).getRoutes(), enviromentConfig.port).startHttpServer()
}

startServer();
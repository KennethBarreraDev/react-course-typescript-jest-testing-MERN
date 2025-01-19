import express, { Router } from 'express';
import cors from 'cors';

const app = express();

export class HttpServer {
  constructor(private readonly routes: Router, private readonly port: number) {
  }

  startHttpServer = async () => {
    try {
      app.use(express.json());
      app.use(cors());
      app.use(this.routes);
      app.listen(this.port, () => {
        console.log('App listening on port ' + this.port);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

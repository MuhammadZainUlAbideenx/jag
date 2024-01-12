import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import config from '../../config';
import Utils from '../utils';
import ConnectToMongoDb from '../connect';
import routes from "../routes";
const app = express();
const server = createServer(app);
const url = 'mongodb+srv://fazfaizan22:faizan123@cluster0.frgg4md.mongodb.net/interest?retryWrites=true&w=majority';
ConnectToMongoDb(url)
  .then(() => console.log('connected to the server'))
  .catch((e) => console.log(e))
const init = () => {
  // const corsOptions = {
  //   origin: '*',
  //   credentials: true,
  // };
  // app.all('/', function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //   next()
  // });
  // app.use(cors(corsOptions));
  // app.options('*', cors(corsOptions));
  app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('../frontend/build'));
  app.use(express.static('./src/assets'));
  app.use('/.well-known', express.static('./src/assets'));
  app.use('/meeting', express.static('../frontend/build'));
  app.use('/join', express.static('../frontend/build'));
  app.use('*', express.static('../frontend/build'));
  app.use(routes);
  server.listen(config.port, () => {
    Utils.logger.info(`http server listening on port ${config.port}`);
  });
};
const HTTPServer = {
  init,
  app,
  server,
};
export default HTTPServer;
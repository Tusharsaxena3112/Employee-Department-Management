import express, { Application} from 'express';
import routes from './routes/index_routes';
import morgan from 'morgan';

const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + 'morgan.log' }))

// Routes
app.use(routes);
app.listen(3000,()=>{
    console.log('Server on port', 3000);
});

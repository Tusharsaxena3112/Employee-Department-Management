import express, { Application} from 'express';
import routes from './routes/index_routes';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";


const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('common'));

app.use(express.static("public"));


app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );

// Routes
app.use(routes);
app.listen(3000,()=>{
    console.log('Server on port', 3000);
});

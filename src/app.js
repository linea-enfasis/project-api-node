import expres from 'express';
import morgan from 'morgan';
import cors from 'cors';
import api from './routes/products.routes.js';
const app = expres();
app.use(cors());
app.use(morgan('dev'));
app.use(expres.json());
app.use('/',api);

app.use( (req,res,next) => {
    res.status(404).json({message:'Página no encontrada'});
});

export default app;
import express, { json } from 'express';
import { testConnection } from './config/sql.config';
import admin_router from './routers/admin.router';
import user_router from './routers/user.router';
import booking_router from './routers/booking.route';
import review_router from './routers/review.route';
import cors from 'cors';

const app = express();


app.use(cors());
app.use(json());
app.use('/admin', admin_router);
app.use('/user', user_router);
app.use('/booking', booking_router);
app.use('/review', review_router);

testConnection();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

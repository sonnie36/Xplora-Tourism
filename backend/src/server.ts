import express, { json } from 'express';
import { testConnection } from './config/sql.config';
import admin_router from './routers/admin.router';
import user_router from './routers/user.router';

const app = express();
app.use(json());
app.use('/admin', admin_router);
app.use('/user', user_router);




testConnection();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

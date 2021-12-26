import dotenv from 'dotenv';
dotenv.config();
import { createServer } from './src/server.js';
const server = createServer();

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

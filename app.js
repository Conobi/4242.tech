require('dotenv').config();
const { createServer } = require('./src/server.js');
const server = createServer();

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

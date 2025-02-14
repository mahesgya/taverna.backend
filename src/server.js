const app = require('./app.js')
const PORT = 5000
require('dotenv').config();

app.listen(PORT, () => {
    console.log(`Server berjalan di port: ${PORT}`)
})
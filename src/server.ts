import config from "./config/index.js";
import app from './app.js';
import { initDB } from "./db/index.js";

const main = async () => {

    initDB()

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`)
    })

}

main()
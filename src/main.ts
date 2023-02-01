import { AppDataSource } from "./config/data-source"
import app from "./app";
import {PORT} from "./config/enviroment";


AppDataSource.initialize().then(async () => {
    console.log("DataSource initialized");

    app.listen(PORT,  () => {
        console.log("Express app listening on port " + PORT);
    })

}).catch(error => console.log(error))

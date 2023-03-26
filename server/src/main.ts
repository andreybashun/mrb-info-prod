import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";

const {
} = process.env;

const  start = async () => {

    try {
        const PORT = 5000;
        const app = await  NestFactory.create(AppModule)
        app.enableCors()
        await app.listen(process.env.SERVER_PORT || 5000, ()=> console.log(`server started on PORT ${PORT}`))

    }catch (e) {
        console.log(e)
    }
}

start()
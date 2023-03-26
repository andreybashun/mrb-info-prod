import {Module} from "@nestjs/common";
import {DocumentModule} from './document/document.module';
import {MongooseModule} from "@nestjs/mongoose";
import {S3Module} from './s3/s3.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { CryptoModule } from './crypto/crypto.module';
import { UserModule } from './user/user.module';
import * as path from "path";

const MONGODB_SSLCA = path.join (__dirname, '..', 'CA.pem');

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    MONGODB_USER,
    MONGODB_PASS
} = process.env;

@Module ({
    imports: [
        ConfigModule.forRoot ({
            isGlobal: true
        }),
        MongooseModule.forRoot ('mongodb://rc1b-dx5pz0isx3vjkswu.mdb.yandexcloud.net:27018/db-mrb?replicaSet=rs01&&ssl=true', {
                ssl: true,
                sslValidate: true,
                sslCA: MONGODB_SSLCA,
                user: 'info-db',
                pass: 'GL<24@nlciu'
            }
        ),

        //MongooseModule.forRoot(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?readPreference=primary&directConnection=true&ssl=false`),
        DocumentModule,
        S3Module,
        TaskModule,
        CryptoModule,
        UserModule]

})
export class AppModule {
}

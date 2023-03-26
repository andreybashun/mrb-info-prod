import {Module} from '@nestjs/common';
import {S3Controller} from './s3.controller';
import {S3Service} from './s3.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {DocRevision, DocRevisionSchema} from "../document/schemas/docrevision.schema";
import {Doc, DocSchema} from "../document/schemas/document.schema";
import {User, UserSchema} from "../user/schemas/user.schema";

@Module ({
    imports: [
        ConfigModule.forRoot ({
            envFilePath: '.env'
        }),
        MongooseModule.forFeature ([{name: DocRevision.name, schema: DocRevisionSchema}],),
        MongooseModule.forFeature ([{name: Doc.name, schema: DocSchema}],),
        MongooseModule.forFeature([{name:User.name, schema: UserSchema}])
    ],

    controllers: [S3Controller],
    providers: [S3Service]
})
export class S3Module {
}

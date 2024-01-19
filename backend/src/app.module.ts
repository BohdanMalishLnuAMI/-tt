import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { User } from "./users/users.model";
import { ConfigModule } from "@nestjs/config";
// import { ServeStaticModule } from "@nestjs/serve-static";
// import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, 'static'),
    // }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
  ]
})

export class AppModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './modules/book.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auths/roles.guard';
import { LoansModule } from './modules/loan.module';




@Module({
  imports: [
    
    SequelizeModule.forRoot(databaseConfig),
    ConfigModule.forRoot(),
    UserModule,
    BookModule,
    AuthModule,
    LoansModule,
    
  ],
  controllers: [AppController],
  providers: [
  //   {
  //     provide:APP_GUARD,
  //     useClass:RolesGuard,

  // },
    AppService
  ],
})
export class AppModule {}

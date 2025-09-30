import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [LinksModule, UsersModule],
  controllers: [AppController, UsersService],
  providers: [AppService, UsersController],
})
export class AppModule {}

import { Module } from '@nestjs/common'; 
import { BakeSubmissionsController } from './bakeSubmissions.controller';
import { BakeSubmissionsService} from './bakeSubmissions.service';
import { PrismaService } from './prisma.service';

@Module ({
    controllers: [BakeSubmissionsController],
    providers: [BakeSubmissionsService, PrismaService],
})
export class BakeSubmissionsModule {}
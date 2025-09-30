import { Module } from '@nestjs/common'; 
import { EnrolledCoursesController } from './enrolledCourses.controller';
import { EnrolledCoursesService} from './enrolledCourses.service';
import { PrismaService } from './prisma.service';

@Module ({
    controllers: [EnrolledCoursesController],
    providers: [EnrolledCoursesService, PrismaService],
})
export class EnrolledCoursesModule {}
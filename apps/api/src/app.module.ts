import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users.module';
import { CoursesModule } from './courses.module';
import { EnrolledCoursesModule } from './enrolledCourses.module';
import { AssignmentsModule } from './assignments.module';
import { SubmissionsModule } from './submissions.module';
import { GradesModule } from './grades.module';
import { BakeSubmissionsModule } from './bakeSubmissions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LinksModule, UsersModule, CoursesModule, EnrolledCoursesModule, AssignmentsModule, SubmissionsModule, GradesModule, BakeSubmissionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Controller, Get, Param } from '@nestjs/common';
import { EnrolledCoursesService } from './enrolledCourses.service';

@Controller('enrolledCourses')
export class EnrolledCoursesController {
    constructor(private readonly enrolledCoursesService: EnrolledCoursesService) {}

    @Get(':id')
    getEnrolledCourseById(@Param('id') id: string) {
        return this.enrolledCoursesService.findOne({ id: String(id) });
    }

    @Get()
    getEnrolledCourses() {
        return this.enrolledCoursesService.findAll();
    }
}
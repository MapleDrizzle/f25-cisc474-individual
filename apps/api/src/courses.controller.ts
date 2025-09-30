import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get(':id')
    getCourseById(@Param('id') id: string) {
        return this.coursesService.findOne({ id: String(id) });
    }

    @Get()
    getCourses() {
        return this.coursesService.findAll();
    }
}
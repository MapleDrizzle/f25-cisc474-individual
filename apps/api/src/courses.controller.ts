import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseCreateIn, CourseUpdateIn } from '@repo/api/courses'; // shared import

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Get()
    getCourses() {
        return this.coursesService.findAll();
    }

  @Post()
  create(@Body() body: CourseCreateIn) {
    return this.coursesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: CourseUpdateIn) {
    return this.coursesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }
}

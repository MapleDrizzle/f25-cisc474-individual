import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseCreateIn, CourseUpdateIn } from '@repo/api/courses'; // shared import
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';
import { Console } from 'console';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }
 
  @UseGuards(AuthGuard('jwt'))
  @Get() // findAll
    getCourses(@CurrentUser() user: JwtUser) {
        console.log('User accessed:', user);
        return this.coursesService.findAll();
    }
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CourseCreateIn, @CurrentUser() user: JwtUser) {
    body.ownerId = user.userId; // set ownerId from authenticated user SIR: UPDATE DATABASE SCHEMA
    return this.coursesService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: CourseUpdateIn) {
    return this.coursesService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }
}

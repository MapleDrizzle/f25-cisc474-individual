import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Course, Prisma } from '@repo/database/generated/client';
import { CourseCreateIn, CourseUpdateIn, CourseOut } from '@repo/api/courses';


@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(
          courseWhereUniqueInput: Prisma.CourseWhereUniqueInput,
  ): Promise<Course | null> {
          return this.prisma.course.findUnique({
              where: courseWhereUniqueInput,
          });
  }

  async create(data: CourseCreateIn) {
    return this.prisma.course.create({ data });
  }

  async update(id: string, data: CourseUpdateIn) {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }
}
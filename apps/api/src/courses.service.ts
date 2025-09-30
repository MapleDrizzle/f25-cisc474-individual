import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Course, Prisma } from '@repo/database/generated/client';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {} // specific row given an id

    async findOne(
        courseWhereUniqueInput: Prisma.CourseWhereUniqueInput,
    ): Promise<Course | null> {
        return this.prisma.course.findUnique({
            where: courseWhereUniqueInput,
        });
    }
    
    async findAll(): Promise<Course[]> {
        return this.prisma.course.findMany();
    }

    async createCourse(data: Prisma.CourseCreateInput): Promise<Course> {
        return this.prisma.course.create({
            data,
        });
    }

    async updateCourse(params: {
    where: Prisma.CourseWhereUniqueInput;
    data: Prisma.CourseUpdateInput;
  }): Promise<Course> {
    const { where, data } = params;
    return this.prisma.course.update({
      data,
      where,
    });
  }

  async deleteCourse(where: Prisma.CourseWhereUniqueInput): Promise<Course> {
    return this.prisma.course.delete({
      where,
    });
  }
}
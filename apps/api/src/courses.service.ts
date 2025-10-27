import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Course, Prisma } from '@repo/database/generated/client';
import { CourseCreateIn, CourseUpdateIn, CourseOut } from '@repo/api/courses';


@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(id: string) { // UPDATED TO NOT GET PRISMA ERROR
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async create(data: CourseCreateIn) {
    return this.prisma.course.create({ data });
  }

  async update(id: string, data: CourseUpdateIn, userId: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    if (course.ownerId !== userId) {
      throw new ForbiddenException('You can only edit your own courses');
    }

    return this.prisma.course.update({
      where: { id },
      data: {
        ...(data.code ? { code: data.code } : {}),
        ...(data.title ? { title: data.title } : {}),
        description: data.description ?? undefined,
      },
    });
  }

  async delete(id: string, userId: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    if (course.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own courses');
    }

    return this.prisma.course.delete({ where: { id } });
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EnrolledCourse, Prisma } from '@repo/database/generated/client';

@Injectable()
export class EnrolledCoursesService {
    constructor(private prisma: PrismaService) {} // specific row given an id

    async findOne(
        enrolledCourseWhereUniqueInput: Prisma.EnrolledCourseWhereUniqueInput,
    ): Promise<EnrolledCourse | null> {
        return this.prisma.enrolledCourse.findUnique({
            where: enrolledCourseWhereUniqueInput,
        });
    }
    
    async findAll(): Promise<EnrolledCourse[]> {
        return this.prisma.enrolledCourse.findMany();
    }

    async createEnrolledCourse(data: Prisma.EnrolledCourseCreateInput): Promise<EnrolledCourse> {
        return this.prisma.enrolledCourse.create({
            data,
        });
    }

    async updateEnrolledCourse(params: {
    where: Prisma.EnrolledCourseWhereUniqueInput;
    data: Prisma.EnrolledCourseUpdateInput;
  }): Promise<EnrolledCourse> {
    const { where, data } = params;
    return this.prisma.enrolledCourse.update({
      data,
      where,
    });
  }

  async deleteEnrolledCourse(where: Prisma.EnrolledCourseWhereUniqueInput): Promise<EnrolledCourse> {
    return this.prisma.enrolledCourse.delete({
      where,
    });
  }
}
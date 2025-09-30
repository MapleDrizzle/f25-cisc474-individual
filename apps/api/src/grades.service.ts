import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Grade, Prisma } from '@repo/database/generated/client';

@Injectable()
export class GradesService {
    constructor(private prisma: PrismaService) {} // specific row given an id

    async findOne(
        gradeWhereUniqueInput: Prisma.GradeWhereUniqueInput,
    ): Promise<Grade | null> {
        return this.prisma.grade.findUnique({
            where: gradeWhereUniqueInput,
        });
    }
    
    async findAll(): Promise<Grade[]> {
        return this.prisma.grade.findMany();
    }

    async createGrade(data: Prisma.GradeCreateInput): Promise<Grade> {
        return this.prisma.grade.create({
            data,
        });
    }

    async updateGrade(params: {
    where: Prisma.GradeWhereUniqueInput;
    data: Prisma.GradeUpdateInput;
  }): Promise<Grade> {
    const { where, data } = params;
    return this.prisma.grade.update({
      data,
      where,
    });
  }

  async deleteGrade(where: Prisma.GradeWhereUniqueInput): Promise<Grade> {
    return this.prisma.grade.delete({
      where,
    });
  }
}
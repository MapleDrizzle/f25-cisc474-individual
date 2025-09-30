import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Assignment, Prisma } from '@repo/database/generated/client';

@Injectable()
export class AssignmentsService {
    constructor(private prisma: PrismaService) {} // specific row given an id

    async findOne(
        assignmentWhereUniqueInput: Prisma.AssignmentWhereUniqueInput,
    ): Promise<Assignment | null> {
        return this.prisma.assignment.findUnique({
            where: assignmentWhereUniqueInput,
        });
    }
    
    async findAll(): Promise<Assignment[]> {
        return this.prisma.assignment.findMany();
    }

    async createAssignment(data: Prisma.AssignmentCreateInput): Promise<Assignment> {
        return this.prisma.assignment.create({
            data,
        });
    }

    async updateAssignment(params: {
    where: Prisma.AssignmentWhereUniqueInput;
    data: Prisma.AssignmentUpdateInput;
  }): Promise<Assignment> {
    const { where, data } = params;
    return this.prisma.assignment.update({
      data,
      where,
    });
  }

  async deleteAssignment(where: Prisma.AssignmentWhereUniqueInput): Promise<Assignment> {
    return this.prisma.assignment.delete({
      where,
    });
  }
}
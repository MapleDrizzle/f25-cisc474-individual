import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BakeSubmission, Prisma } from '@repo/database/generated/client';

@Injectable()
export class BakeSubmissionsService {
    constructor(private prisma: PrismaService) {} // specific row given an id

    async findOne(
        bakeSubmissionWhereUniqueInput: Prisma.BakeSubmissionWhereUniqueInput,
    ): Promise<BakeSubmission | null> {
        return this.prisma.bakeSubmission.findUnique({
            where: bakeSubmissionWhereUniqueInput,
        });
    }
    
    async findAll(): Promise<BakeSubmission[]> {
        return this.prisma.bakeSubmission.findMany();
    }

    async createBakeSubmission(data: Prisma.BakeSubmissionCreateInput): Promise<BakeSubmission> {
        return this.prisma.bakeSubmission.create({
            data,
        });
    }

    async updateBakeSubmission(params: {
    where: Prisma.BakeSubmissionWhereUniqueInput;
    data: Prisma.BakeSubmissionUpdateInput;
  }): Promise<BakeSubmission> {
    const { where, data } = params;
    return this.prisma.bakeSubmission.update({
      data,
      where,
    });
  }

  async deleteBakeSubmission(where: Prisma.BakeSubmissionWhereUniqueInput): Promise<BakeSubmission> {
    return this.prisma.bakeSubmission.delete({
      where,
    });
  }
}
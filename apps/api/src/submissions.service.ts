import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Submission, Prisma } from '@repo/database/generated/client';

@Injectable()
export class SubmissionsService {
    constructor(private prisma: PrismaService) {} // specific row given an id

    async findOne(
        submissionWhereUniqueInput: Prisma.SubmissionWhereUniqueInput,
    ): Promise<Submission | null> {
        return this.prisma.submission.findUnique({
            where: submissionWhereUniqueInput,
        });
    }
    
    async findAll(): Promise<Submission[]> {
        return this.prisma.submission.findMany();
    }

    async createSubmission(data: Prisma.SubmissionCreateInput): Promise<Submission> {
        return this.prisma.submission.create({
            data,
        });
    }

    async updateSubmission(params: {
    where: Prisma.SubmissionWhereUniqueInput;
    data: Prisma.SubmissionUpdateInput;
  }): Promise<Submission> {
    const { where, data } = params;
    return this.prisma.submission.update({
      data,
      where,
    });
  }

  async deleteSubmission(where: Prisma.SubmissionWhereUniqueInput): Promise<Submission> {
    return this.prisma.submission.delete({
      where,
    });
  }
}
import { Controller, Get, Param } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
    constructor(private readonly submissionsService: SubmissionsService) {}

    @Get(':id')
    getSubmissionById(@Param('id') id: string) {
        return this.submissionsService.findOne({ id: String(id) });
    }

    @Get()
    getSubmissions() {
        return this.submissionsService.findAll();
    }
}
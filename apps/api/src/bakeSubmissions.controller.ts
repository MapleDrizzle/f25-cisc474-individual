import { Controller, Get, Param } from '@nestjs/common';
import { BakeSubmissionsService } from './bakeSubmissions.service';

@Controller('bakeSubmissions')
export class BakeSubmissionsController {
    constructor(private readonly bakeSubmissionsService: BakeSubmissionsService) {}

    @Get(':id')
    getBakeSubmissionById(@Param('id') id: string) {
        return this.bakeSubmissionsService.findOne({ id: String(id) });
    }

    @Get()
    getBakeSubmissions() {
        return this.bakeSubmissionsService.findAll();
    }
}
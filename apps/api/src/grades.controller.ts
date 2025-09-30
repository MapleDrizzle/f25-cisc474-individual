import { Controller, Get, Param } from '@nestjs/common';
import { GradesService } from './grades.service';

@Controller('grades')
export class GradesController {
    constructor(private readonly gradesService: GradesService) {}

    @Get(':id')
    getGradeById(@Param('id') id: string) {
        return this.gradesService.findOne({ id: String(id) });
    }

    @Get()
    getGrades() {
        return this.gradesService.findAll();
    }
}
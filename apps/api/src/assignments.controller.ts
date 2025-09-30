import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) {}

    @Get(':id')
    getAssignmentById(@Param('id') id: string) {
        return this.assignmentsService.findOne({ id: String(id) });
    }

    @Get()
    getAssignments() {
        return this.assignmentsService.findAll();
    }
}
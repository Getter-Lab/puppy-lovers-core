import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExampleUseCase } from '../../application/useCase/example/create.usecase';
import { GetAllExampleUseCase } from '../../application/useCase/example/get-all.usecase';
import { CreateExampleDto } from './dto/create-example.dto';
import { ExampleRoutes } from './routes/example.enum';

@ApiTags('Example')
@Controller(ExampleRoutes.root)
export class ExampleController {
  constructor(
    private readonly createExampleUC: CreateExampleUseCase,
    private readonly getAllExampleUC: GetAllExampleUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateExampleDto) {
    return this.createExampleUC.execute(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.getAllExampleUC.execute();
  }
}

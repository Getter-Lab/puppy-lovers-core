import { ApiCustomDoc } from '@/common/infra/doc/swagger.decorator';
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExampleUseCase } from '../../application/useCase/create.usecase';
import { GetAllExampleUseCase } from '../../application/useCase/get-all.usecase';
import { CreateExampleDto } from './dto/create-example.dto';
import { ExampleRoutes } from './routes/example.enum';

@ApiTags('Example')
@Controller(ExampleRoutes.root)
export class ExampleController {
  constructor(
    private readonly createExampleUC: CreateExampleUseCase,
    private readonly getAllExampleUC: GetAllExampleUseCase,
  ) {}

  @ApiCustomDoc({
    summary: 'Create a new example',
    responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Example created',
        type: String,
      },
    ],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateExampleDto) {
    return this.createExampleUC.execute(dto);
  }

  @ApiCustomDoc({
    summary: 'Get all examples',
    responses: [
      {
        status: HttpStatus.OK,
        description: 'Examples found',
        type: String,
      },
    ],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.getAllExampleUC.execute();
  }
}

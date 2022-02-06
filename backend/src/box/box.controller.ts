import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/createBox.dto';
import { GetBoxesFilterDto } from './dto/getBoxesFilter.dto';
import { TableData } from 'src/common/types/tableData.interface';

@ApiTags('Бытовки')
@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Get('/all')
  @ApiOperation({ summary: 'Получить по идентификатору' })
  @ApiResponse({ status: 200, description: 'Бытовка', type: TableData })
  @UseGuards(AuthGuard)
  async getAllBoxes(@Query() query: GetBoxesFilterDto) {
    return this.boxService.getAllBoxes(query);
  }

  @Post()
  @ApiOperation({ summary: 'Создание бытовки' })
  @ApiResponse({ status: 201, description: 'Бытовка создана', type: CreateBoxDto })
  @ApiBody({ type: CreateBoxDto })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createUser(@Body() boxDto: CreateBoxDto) {
    return await this.boxService.createBox(boxDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить по идентификатору' })
  @ApiResponse({ status: 200, description: 'Бытовка', type: CreateBoxDto })
  @UseGuards(AuthGuard)
  async getById(@Param('id') boxId: string) {
    return this.boxService.getBoxById(boxId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Редактирование бытовки по идентификатору' })
  @ApiResponse({ status: 200, description: 'Бытовка', type: CreateBoxDto })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateBoxById(@Param('id') boxId: string, @Body() boxDto: CreateBoxDto) {
    return this.boxService.updateById(boxId, boxDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить по айди' })
  @UseGuards(AuthGuard)
  async deleteById(@Param('id') id: string) {
    return this.boxService.deleteById(id);
  }
}

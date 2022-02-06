import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, ObjectId } from '@mikro-orm/mongodb';
import { BoxEntity } from './box.entity';
import { CreateBoxDto } from './dto/createBox.dto';
import { GetBoxesFilterDto } from './dto/getBoxesFilter.dto';
import { TableData } from 'src/common/types/tableData.interface';

@Injectable()
export class BoxService {
  constructor(
    @InjectRepository(BoxEntity)
    private readonly boxRepository: EntityRepository<BoxEntity>,
  ) {}

  async createBox(boxDto: CreateBoxDto): Promise<BoxEntity> {
    const { number } = boxDto;
    const boxByNumber = await this.boxRepository.findOne({ number });
    if (boxByNumber) {
      throw new HttpException('Box with the number already exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    try {
      const newBox = new BoxEntity();
      wrap(newBox).assign(boxDto);
      await this.boxRepository.persist(newBox).flush();

      return newBox;
    } catch (e) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllBoxes(query: GetBoxesFilterDto): Promise<TableData<BoxEntity>> {
    const { page, size } = query;
    const offset = page && size && (Number(page) - 1) * Number(size);
    const limit = size && Number(size);

    const [boxes, count] = await this.boxRepository.findAndCount(
      {},
      {
        populate: {},
        orderBy: { name: QueryOrder.DESC },
        offset,
        limit,
      },
    );

    return {
      data: boxes,
      page: Number(page),
      size: Number(size),
      count,
    };
  }

  async getBoxById(boxId: string): Promise<BoxEntity> {
    const box = await this.boxRepository.findOne({ _id: [new ObjectId(boxId)] });
    if (!box) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return box;
  }

  async updateById(boxId: string, boxData: CreateBoxDto) {
    const box = await this.getBoxById(boxId);

    wrap(box).assign(boxData, { mergeObjects: false });
    await this.boxRepository.flush();

    return box;
  }

  async deleteById(boxId: string): Promise<any> {
    const box = await this.getBoxById(boxId);
    await this.boxRepository.remove(box).flush();

    return { message: 'Success' };
  }
}

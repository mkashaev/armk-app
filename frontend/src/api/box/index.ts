import { API } from 'api/base';
import { IPagination, ITableData } from 'common/types/tableData.interface';
import { IBoxDto, IBox } from './types';

export type { IBoxDto, IBox };

export const getBoxById = (boxId: string): Promise<IBox> => API.get(`/api/box/${boxId}`);

export const createBox = (boxDto: IBoxDto): Promise<IBox> => API.post('/api/box', boxDto);

export const updateBox = (boxId: string, boxDto: IBoxDto): Promise<IBox> =>
  API.patch(`/api/box/${boxId}`, boxDto);

export const getAllBoxes = (params: IPagination): Promise<ITableData<IBox>> =>
  API.get('/api/box/all', { params });

export const deleteBox = (boxId: string): Object => API.delete(`/api/box/${boxId}`);

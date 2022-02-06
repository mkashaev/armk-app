export interface IBoxDto {
  number: string;
  title: string;
  status: string;
  location: string;
  description: string;
  imgUrls: string[];
}

export interface IBox {
  id: string;
  createdAt: string;
  updatedAt: string;
  number: string;
  title: string;
  status: string;
  location?: string;
  description?: string;
  imgUrls?: string[];
}

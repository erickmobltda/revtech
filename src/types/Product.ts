export interface Product {
  id?: string;
  code: string;
  name: string;
  nomeFornecedor: string;
  description: string;
  imageUrl: string;
  url: string;
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFormData {
  code: string;
  name: string;
  nomeFornecedor: string;
  description: string;
  imageUrl: string;
  url: string;
}

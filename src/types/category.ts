// /{teamId}/categories (GET)

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type CategoryListResponse = Category[];

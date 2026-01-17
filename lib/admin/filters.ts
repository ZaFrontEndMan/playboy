import { Product, Category } from '@/types/product';
import { Drop, Availability } from '@/types/drop';

export interface ProductFilterOptions {
  category?: Category;
  isNew?: boolean;
  isBestseller?: boolean;
  isOnSale?: boolean;
}

export interface DropFilterOptions {
  availability?: Availability;
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;
  
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  );
}

export function filterProducts(products: Product[], filters: ProductFilterOptions): Product[] {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.isNew !== undefined && product.isNew !== filters.isNew) return false;
    if (filters.isBestseller !== undefined && product.isBestseller !== filters.isBestseller) return false;
    if (filters.isOnSale !== undefined && product.isOnSale !== filters.isOnSale) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sortBy: string, order: 'asc' | 'desc' = 'asc'): Product[] {
  const sorted = [...products];
  
  sorted.sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'category':
        aValue = a.category;
        bValue = b.category;
        break;
      case 'id':
      default:
        aValue = a.id;
        bValue = b.id;
        break;
    }
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

export function searchDrops(drops: Drop[], query: string): Drop[] {
  if (!query.trim()) return drops;
  
  const lowerQuery = query.toLowerCase();
  return drops.filter(drop => 
    drop.name.toLowerCase().includes(lowerQuery) ||
    drop.description.toLowerCase().includes(lowerQuery)
  );
}

export function filterDrops(drops: Drop[], filters: DropFilterOptions): Drop[] {
  return drops.filter(drop => {
    if (filters.availability && drop.availability !== filters.availability) return false;
    return true;
  });
}

export function sortDrops(drops: Drop[], sortBy: string, order: 'asc' | 'desc' = 'asc'): Drop[] {
  const sorted = [...drops];
  
  sorted.sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'availability':
        aValue = a.availability;
        bValue = b.availability;
        break;
      case 'id':
      default:
        aValue = a.id;
        bValue = b.id;
        break;
    }
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}



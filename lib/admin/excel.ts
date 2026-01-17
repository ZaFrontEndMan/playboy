import * as XLSX from 'xlsx';
import { Product } from '@/types/product';
import { Drop } from '@/types/drop';

export function exportProductsToExcel(products: Product[]): ArrayBuffer {
  const data = products.map(product => ({
    'ID': product.id,
    'Name': product.name,
    'Category': product.category.toUpperCase(),
    'Price': product.price,
    'Sale Price': product.salePrice || '',
    'Is New': product.isNew ? 'Yes' : 'No',
    'Is Bestseller': product.isBestseller ? 'Yes' : 'No',
    'Is On Sale': product.isOnSale ? 'Yes' : 'No',
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  const buffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  return new Uint8Array(buffer).buffer;
}

export function exportDropsToExcel(drops: Drop[]): ArrayBuffer {
  const data = drops.map(drop => ({
    'ID': drop.id,
    'Name': drop.name,
    'Price': drop.price,
    'Availability': drop.availability === 'avail' ? 'Available' : 'Coming Soon',
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Drops');

  const buffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  return new Uint8Array(buffer).buffer;
}


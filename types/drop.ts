export type Availability = 'avail' | 'soon';

export interface Drop {
  id: number;
  name: string; // Format: "Drop 01 - Item 1"
  price: number;
  image: string;
  description: string;
  sizes: string[]; // 3 sizes for each drop
  availability: Availability; // 'avail' or 'soon'
  // No colors field - limited edition items have no color options
}







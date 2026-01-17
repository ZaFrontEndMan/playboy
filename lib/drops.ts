import { Drop, Availability } from "@/types/drop";

// Drop data with 4 items: 3 available, 1 coming soon
const dropsData: Drop[] = [
  {
    id: 1,
    name: "Drop 01 - Item 1",
    image: "/drop (1).png",
    price: 349,
    description:
      "Limited edition drop item. Exclusive design with premium materials. Once sold out, never restocked.",
    sizes: ["S", "M", "L"],
    availability: "avail",
  },
  {
    id: 2,
    name: "Drop 01 - Item 2",
    image: "/drop (2).png",
    price: 349,
    description:
      "Limited edition drop item. Exclusive design with premium materials. Once sold out, never restocked.",
    sizes: ["S", "M", "L"],
    availability: "avail",
  },
  {
    id: 3,
    name: "Drop 01 - Item 3",
    image: "/drop (3).png",
    price: 349,
    description:
      "Limited edition drop item. Exclusive design with premium materials. Once sold out, never restocked.",
    sizes: ["S", "M", "L"],
    availability: "avail",
  },
  {
    id: 4,
    name: "Drop 01 - Item 4",
    image: "/drop (4).png",
    price: 349,
    description:
      "Limited edition drop item. Exclusive design with premium materials. Coming soon - be ready for the drop.",
    sizes: ["S", "M", "L"],
    availability: "soon",
  },
];

// Helper functions
export function getAllDrops(): Drop[] {
  return dropsData;
}

export function getDropById(id: number): Drop | undefined {
  return dropsData.find((drop) => drop.id === id);
}

export function getAvailableDrops(): Drop[] {
  return dropsData.filter((drop) => drop.availability === "avail");
}

export function getComingSoonDrops(): Drop[] {
  return dropsData.filter((drop) => drop.availability === "soon");
}

export function getDropsByAvailability(availability?: Availability): Drop[] {
  if (!availability) {
    return getAllDrops();
  }
  return dropsData.filter((drop) => drop.availability === availability);
}

// CRUD operations for admin
export function createDrop(drop: Omit<Drop, 'id'>): Drop {
  const maxId = dropsData.length > 0 
    ? Math.max(...dropsData.map(d => d.id)) 
    : 0;
  const newDrop: Drop = {
    ...drop,
    id: maxId + 1,
  };
  dropsData.push(newDrop);
  return newDrop;
}

export function updateDrop(id: number, updates: Partial<Drop>): Drop | null {
  const index = dropsData.findIndex(d => d.id === id);
  if (index === -1) return null;
  
  dropsData[index] = {
    ...dropsData[index],
    ...updates,
    id, // Ensure ID cannot be changed
  };
  return dropsData[index];
}

export function deleteDrop(id: number): boolean {
  const index = dropsData.findIndex(d => d.id === id);
  if (index === -1) return false;
  
  dropsData.splice(index, 1);
  return true;
}
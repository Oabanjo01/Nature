export interface ItemProps {
  id: string;
  image: string;
  description: string;
}
export interface PlantProps {
  id: string;
  imagePath: string;
  description1: string;
  subDescription2: string;
}

export const Data: ItemProps[] = [
  {
    id: '1',
    image: 'images',
    description: 'Identify',
  },
  {
    id: '2',
    image: 'images',
    description: 'Species',
  },
  {
    id: '3',
    image: 'images',
    description: 'Articles',
  },
];
export const PlantData: PlantProps[] = [
  {
    id: '1',
    imagePath: 'images',
    description1: 'Identify',
    subDescription2: 'Identify2',
  },
  {
    id: '2',
    imagePath: 'images',
    description1: 'Species',
    subDescription2: 'Species',
  },
  {
    id: '3',
    imagePath: 'images',
    description1: 'Species',
    subDescription2: 'Species',
  },
];
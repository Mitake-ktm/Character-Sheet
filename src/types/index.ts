export type Character = {
  id?: string; 
  name: string;
  title: string;
  quote?: string;
  description: string;
  image: string;
  pixelArt?: string; 
  color: string;
  details: {
    age: string;
    size: string;
    personnality: string[];
    skills?: string[]; 
  };
  particle?: {
    number?: number;
    size?: number;
    speed?: number;
    opacity?: number;
    shape?: string;
  };
};
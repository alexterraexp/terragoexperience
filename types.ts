
export interface Host {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  location: string;
  specialty: string;
  since: string;
  rating: number;
  reviewCount: number;
  visitCount: number; // Nombre d'immersions réalisées
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  region: string; // Nouvelle propriété pour le filtrage par région
  price: number;
  image: string; // Image principale (miniature)
  gallery: string[]; // Galerie de 3 images pour la page de détail
  category: string;
  duration: string;
  coords: { x: number; y: number };
  host: Host;
  description: string;
  included: string[];
  maxGuests: number;
}

export interface NavItem {
  label: string;
  path: string;
  soon?: boolean;
}
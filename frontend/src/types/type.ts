import { SVGProps } from "react";

export interface Product {
  p_id: number;
  name: string;
  price: number;
  colour: string;
  brand: string;
  img: string;
  ratingCount: number;
  avg_rating: number;
  description: string;
  p_attributes: {
    [key: string]: string;
  };
}

export type IconProps = SVGProps<SVGSVGElement>;

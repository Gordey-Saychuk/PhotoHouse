import type { Slide } from "~/types/slide";
export type Category = {
    id: number;
    title: string;
    image: string | null;
    clothes: Slide[];
    subCategories: Category[];
}
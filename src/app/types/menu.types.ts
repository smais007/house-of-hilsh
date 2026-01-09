export interface MenuItem {
  id: number | string;
  title: string;
  price: string;
  description: string;
  image?: string;
}

export interface MenuCategoryData {
  id: number | string;
  tag?: string;
  title: string;
  phrase?: string;
  image: string;
  altText?: string;
  dishesList: MenuItem[];
  anchor?: string;
  align?: string;
  icon?: string;
  link?: string;
}

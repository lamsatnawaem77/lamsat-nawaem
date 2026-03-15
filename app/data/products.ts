// app/data/products.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "عطر لمسة نواعم",
    price: 35,
    image: "/products/products1.png",
    description: "عطر نسائي فاخر بثبات عالي ورائحة ناعمة"
  },
  {
    id: 2,
    name: "كريم ترطيب طبيعي",
    price: 20,
    image: "/products/products2.png",
    description: "كريم مرطب للبشرة الحساسة مصنوع من مكونات طبيعية"
  },
  {
    id: 3,
    name: "زيت شعر مغذي",
    price: 18,
    image: "/products/products3.png",
    description: "زيت مغذي لتقوية الشعر ولمعانه"
  }
];

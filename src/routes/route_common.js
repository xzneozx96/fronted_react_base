import { ProductList } from "@modules/product/product-list";
import { ProductDetail } from "@modules/product/product-detail";

const basePath = "/product";

export const commonRoutes = [
  {
    title: "Product List",
    path: basePath + "/list",
    component: ProductList,
    subItems: [],
    privateRoute: false,
  },
  {
    title: "Product Detail",
    path: basePath + "/detail",
    component: ProductDetail,
    subItems: [],
    privateRoute: false,
  },
];

import { Home } from "@modules/common/home";
import { AboutUs } from "@modules/common/about-us";
import { ContactUs } from "@modules/common/contact-us";

export const productRoutes = [
  {
    title: "Home",
    path: "/home",
    component: Home,
    subItems: [],
    privateRoute: false,
  },
  {
    title: "About Us",
    path: "/about-us",
    component: AboutUs,
    subItems: [],
    privateRoute: false,
  },
  {
    title: "Contact Us",
    path: "/contact-us",
    component: ContactUs,
    subItems: [],
    privateRoute: false,
  },
];

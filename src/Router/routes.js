import Login from "@/components/Authentication/Login.vue";
import Contact from "@/components/Home/Contact.vue";
import HomePage from "@/components/Home/HomePage.vue";
import NoAccess from "@/components/Layout/NoAccess.vue";
import NotFound from "@/components/Layout/NotFound.vue";
import ProductDetail from "@/components/Product/ProductDetail.vue";
import ProductList from "@/components/Product/ProductList.vue";
import { createRouter, createWebHistory } from "vue-router";

function isAdmin() {
  const isAdmin = false;
  if (isAdmin) {
    return true;
  }
 return { name: "noaccess" };
}

function isAuthenticated() {
  const isAuthenticated = true;
  if (isAuthenticated) {
    return true;
  }
  return false
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomePage,
      name: "Home",
    },
    {
      path: "/contact-us",
      component: Contact,
      name: "contact",
    },
    {
      path: "/contact",
      redirect: { name: "contact" },
    },
    {
      path: "/noaccess",
      component:NoAccess,
      name: "noaccess",
    },
    {
      path: "/productList",
      component: ProductList,
      name: "productList",
      beforeEnter: [isAdmin, isAuthenticated],
    },
    {
      path: "/login",
      component: Login,
      name: "login",
    },
    {
      path: "/product/:productId/:categoryId?",
      component: ProductDetail,
    },
    {
      path: "/product",
      component: ProductDetail,
      name: "productDetails",
      props: true,
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },
  ],
  linkActiveClass:"active"
});

router.beforeEach((to, from) => {
  console.log("Global Before Each");
  console.log(to, from);

  //Check if user is authenticated
  //if not redirect to login page
  const isAuthenticated = true;
  if (!isAuthenticated && to.name !== "login") {
    return { name: "login" };
  }

  return true;
});

export default router;

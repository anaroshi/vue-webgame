import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import sourceData from "@/data";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true,
    alias: "/home",
  },
  // {
  //   path: "/home",
  //   redirect: "/",
  // },
  {
    path: "/protected",
    name: "Protected",
    components: {
      default: () => import("@/views/ProtectedView"),
      LeftSidebar: () => import("@/components/LeftSidebar"),
    },
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView"),
  },
  {
    path: "/invoices",
    name: "Invoices",
    components: {
      default: () => import("@/views/InvoicesView"),
      LeftSidebar: () => import("@/components/LeftSidebar"),
    },
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/example/:id(\\d+)*",
    component: () => import("@/views/LoginView"),
  },
  {
    path: "/destination/:slug",
    name: "destination.show",
    component: () => import("@/views/DestinationShow"),
    // props: true,
    props: (route) => ({ ...route.params, slug: route.params.slug }),
    beforeEnter(to, from) {
      console.log(".......destination" + from);
      const exists = sourceData.destinations.find(
        (destination) => destination.slug === to.params.slug
      );
      if (!exists)
        return {
          name: "NotFound",
          // allows keeping the URL while rendering a different page
          params: {
            pathMatch: to.path.split("/").slice(1),
          },
          query: to.query,
          hash: to.hash,
        };
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () => import("@/views/ExperienceShow"),
        props: (route) => ({ ...route.params, slug: route.params.slug }),
      },
    ],
  },
  {
    // path: "/:pathMatch(.*)*",
    // alias: "/:catchAll(.*)",
    path: "/404",
    alias: "/:whateverParam(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "@/views/NotFound"),
  },
];

const scrollBehavior = (to, from, savedPosition) => {
  // 페이지 변경시 스크롤을 가장 위로 위치시킴
  return (
    savedPosition ||
    new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 300);
    })
  );
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
  linkActiveClass: "vue-school-active-link",
});

router.beforeEach((to, from) => {
  console.log(".......from : " + from);
  if (to.meta.requiredAuth && !window.user) {
    return { name: "Login", query: { redirect: to.fullPath } };
  }
});

export default router;

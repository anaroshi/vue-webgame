import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    props: true,
  },
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "DestinationDetails" */ "../views/DestinationDetails"
      ),
    children: [
      {
        path: ":experienceSlug",
        name: "ExperienceDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "DestinationExperienceDetails" */ "../views/ExperienceDetails"
          ),
      },
    ],
    beforeEnter: (to, from, next) => {
      const exists = store.destinations.find(
        (destination) => destination.slug == to.params.slug
      );
      exists ? next() : next({ name: "NotFound" });
    },
  },
  // {
  //   path: "/destination/:slug/:experienceSlug",
  //   name: "ExperienceDetails",
  //   props: true,
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "DestinationExperienceDetails" */ "../views/ExperienceDetails"
  //     ),
  // },
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "User" */ "../views/GetUser"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/GetLogin"),
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () =>
      import(/* webpackChunkName: "GetInvoices" */ "../views/GetInvoices"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/404",
    alias: "/:catchAll(.*)",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound"),
  },
];

const scrollBehavior = (to, from, savedPosition) => {
  let position = {};
  if (savedPosition) {
    position = savedPosition;
  } else {
    if (to.hash) {
      position.selector = to.hash;
      if (to.hash === "#experience") {
        position.offset = { y: 140 };
      }
      if (document.querySelector(to.hash)) {
        return { el: to.hash }; // #experience가 상단으로 위치함
        // return new Promise((resolve) => {
        //   setTimeout(() => {
        //     resolve(position);
        //   }, 330);
        // });
      }
      return false;
    }
  }
};

// history: createWebHistory() 경로에 해시태그 #가 생기는걸 막는다.
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior,
  routes,
  linkExactActiveClass: "vue-school-active-class",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // need to login - redirect path
    if (!store.user) {
      next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

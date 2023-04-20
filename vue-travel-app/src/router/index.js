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
    path: "/404",
    alias: "/:catchAll(.*)",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound"),
  },
];

// history: createWebHistory() 경로에 해시태그 #가 생기는걸 막는다.
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "vue-school-active-class",
});

export default router;

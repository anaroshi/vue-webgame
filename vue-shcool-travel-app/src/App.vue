<template>
  <div>
    <TheNavigation />
    <div class="container">
      <!-- Sidebar -->
      <router-view
        v-slot="{ Component }"
        class="view left-sidebar"
        name="LeftSidebar"
      >
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.path"></component>
        </transition>
      </router-view>
      <!-- Main -->
      <router-view v-slot="{ Component }" class="main-view">
        <!-- :key="$route.path" 페이지에 변경이 있으면 감지하고 리로드한다. -->
        <!-- <transition name="slide" mode="out-in"> -->
        <!-- <transition name="moveUp"> -->
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.path"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation";
export default {
  components: { TheNavigation },
};
</script>

<style lang="css">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

.moveUp-enter-active {
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.moveUp-leave-active {
  animation: moveUp 0.3s ease-in;
}
@keyframes moveUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.container {
  display: flex;
}
.left-sidebar {
  width: 20%;
}
.main-view {
  width: 100%;
}
</style>

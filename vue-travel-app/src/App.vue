<template>
  <div id="app">
    <div id="nav">
      <TheNavigation />
      <!-- <transition name="slide" mode="out-in"> -->
      <!-- <transition name="moveUp"> -->
      <transition name="fade">
        <router-view :key="$route.path" />
        <!-- :key="$route.path" => 같은 페이지에서 id 값만 변할때 화면 재로딩이 필요할때는 컴포넌트 이름에다 path값을 넣어준다. -->
      </transition>
    </div>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation";

export default {
  components: {
    TheNavigation,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}
.slide-enter,
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
</style>

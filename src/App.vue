<!-- <template>
  Page Transition Wrapper
  <transition name="fade" mode="out-in">
    <RouterView />
  </transition>
</template>

<style scoped>
/* Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> -->

<template>
  <div>
    <!-- <Navbar /> -->
    <!-- Page Transition Wrapper -->
    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
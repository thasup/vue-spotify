<template>
  <!-- Header -->
  <app-header></app-header>

  <router-view></router-view>

  <music-player></music-player>

  <!-- Auth Modal -->
  <app-auth></app-auth>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppAuth from './components/AppAuth.vue';
import MusicPlayer from './components/MusicPlayer.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    MusicPlayer,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>

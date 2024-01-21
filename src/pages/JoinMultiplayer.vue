<template>
  <div class="join_multiplayer">
    <NavBar/>
    <JoinMultiplayerForm></JoinMultiplayerForm>
  </div>
</template>
  
<script>
  import NavBar from '../components/NavBar.vue';
  import JoinMultiplayerForm from '../components/JoinMultiplayerForm.vue';
  
  export default {
    name: 'Join-Multiplayer-View',
    components: {
      NavBar,
      JoinMultiplayerForm
    },
  }
</script>
  
<style scoped>
  .join_multiplayer {
    background: rgb(41, 41, 41);
  }
</style>
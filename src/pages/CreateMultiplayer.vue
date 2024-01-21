<template>
  <div class="create_multiplayer">
    <NavBar/>
    <CreateMultiplayerForm></CreateMultiplayerForm>
  </div>
</template>
  
<script>
  import NavBar from '../components/NavBar.vue';
  import CreateMultiplayerForm from '../components/CreateMultiplayerForm.vue';
  
  export default {
    name: 'Create-Multiplayer-View',
    components: {
      NavBar,
      CreateMultiplayerForm
    },
  }
</script>
  
<style scoped>
  .create_multiplayer {
    background: rgb(41, 41, 41);
  }


</style> 
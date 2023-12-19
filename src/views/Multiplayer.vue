<template>
  <div class="multiplayer">
    <NavBar/>
    <GameBoard/>
  </div>
</template>
  
<script>
  import NavBar     from '@/components/NavBar.vue';
  import GameBoard  from '@/components/GameBoard.vue';
  
  export default {
    name: 'Multiplayer-View',
    components: {
      NavBar,
      GameBoard,
    },
  }
</script>
  
<style scoped>
  .multiplayer {
    background: rgb(41, 41, 41);
    height: 100vh;
  }
  .game{
    top: 0;
  }   
</style>
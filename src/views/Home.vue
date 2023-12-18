<template>
<body>
  <div class="container-fluid full-layout" id="container_all">
      <NavBar/>
      <IndexStones/>
      <GameBoard/>
  </div>
</body>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import IndexStones from '@/components/IndexStones.vue';
import GameBoard from '@/components/GameBoard.vue';

export default {
  name: 'Home-View',
  components: {
    NavBar,
    IndexStones,
    GameBoard
  },
}
</script>

<style scoped>
body {
  background-color: rgb(41, 41, 41);
  font-family: Arial, sans-serif;
}
</style>
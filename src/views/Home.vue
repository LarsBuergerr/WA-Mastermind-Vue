<template>
  <div class="home">
    <NavBar/>
    <IndexStones/>
    <GameBoard/>
  </div>
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
    GameBoard,
  },
}
</script>

<style scoped>
.home {
  background-color: rgb(41, 41, 41);
  height: 200vh;
}
</style>
<template>
<div class="container-fluid full-layout" id="container_all">
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
    GameBoard
  },
}
</script>

<style scoped>
.container-fluid {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: rgb(41, 41, 41);
}
</style>
<template>
    <div class="banner">
      <img src="/images/online_banner.png" class="banner_image">
    </div>
    <div class="stones">
      <img src="/images/stones/stone_win.png" class="stone_win round_image">
      <img src="/images/stones/stone_B.png" class="stone_B round_image">
      <img src="/images/stones/stone_G.png" class="stone_G round_image">
      <img src="/images/stones/stone_R.png" class="stone_R round_image">
      <img src="/images/stones/stone_Y.png" class="stone_Y round_image">
      <img src="/images/stones/stone_W.png" class="stone_W round_image">
      <img src="/images/stones/stone_P.png" class="stone_P round_image">
      <h2 class="front_text">Can you guess the code?</h2>
    </div>
    <img src="/images/arrow.png" class="arrow"> 
</template>

<script>
import $ from 'jquery';

export default {
    name: 'IndexStones',

    methods: {
        stones_movement() {
            let text_offset, arrow_offset, stone_R_offset, stone_B_offset, stone_G_offset,
                stone_Y_offset, stone_W_offset, stone_P_offset, stone_win_offset;
      // if game_multiplayer is part of path do nothing
            $(document).ready(function() {
                let text = document.querySelector(".front_text");
                let arrow = document.querySelector(".arrow");
                let stone_B = document.querySelector(".stone_B");
                let stone_G = document.querySelector(".stone_G");
                let stone_R = document.querySelector(".stone_R");
                let stone_Y = document.querySelector(".stone_Y");
                let stone_W = document.querySelector(".stone_W");
                let stone_P = document.querySelector(".stone_P");
                let stone_win = document.querySelector(".stone_win");
            
                text_offset = parseFloat(getComputedStyle(text).marginTop);
                arrow_offset = parseFloat(getComputedStyle(arrow).top);
                stone_R_offset = parseFloat(getComputedStyle(stone_R).left);
                stone_B_offset = parseFloat(getComputedStyle(stone_B).left);
                stone_G_offset = parseFloat(getComputedStyle(stone_G).left);
                stone_Y_offset = parseFloat(getComputedStyle(stone_Y).left);
                stone_W_offset = parseFloat(getComputedStyle(stone_W).left);
                stone_P_offset = parseFloat(getComputedStyle(stone_P).left);
                stone_win_offset = parseFloat(getComputedStyle(stone_win).top);
            
                window.addEventListener('scroll', () => {
                let value = window.scrollY;
                text.style.marginTop = text_offset + value * 2.5 + 'px';
                arrow.style.top = arrow_offset + value * 0.5 + 'px';
                stone_R.style.left = stone_R_offset - value * 0.6 + 'px';
                stone_B.style.left = stone_B_offset - value * 0.2 + 'px';
                stone_G.style.left = stone_G_offset + value * 0.1 + 'px';
                stone_Y.style.left = stone_Y_offset - value * 0.3 + 'px';
                stone_W.style.left = stone_W_offset + value * 1.2 + 'px';
                stone_P.style.left = stone_P_offset + value * 0.4 + 'px';
                stone_win.style.top = stone_win_offset - value * 0.3 + 'px';
            
                let opacity = 1 - value / 450;
                text.style.opacity = opacity < 0 ? 0 : opacity;
                arrow.style.opacity = opacity < 0 ? 0 : opacity;
                });
            });
        },
    },

    mounted() {
        if (!window.location.pathname.includes("game_multiplayer")) {
            this.stones_movement();
        }
    }
}


</script>

<style scoped>
</style>
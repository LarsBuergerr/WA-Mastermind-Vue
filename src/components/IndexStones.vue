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

.round_image {
  border-radius: 50%;
}

.arrow {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -60%);
  height: 30%;
  pointer-events: none; /* Disable mouse events on the arrow */
  z-index: 3; /* Set a higher z-index value */
  animation: fade_in 2s ease-in, bounce 2s infinite; /* Add fade-in and bounce animation */
}

.front_text {
  pointer-events: none;
  font-family:'Roboto', sans-serif;
  font-weight: bold;
  text-align: center;
  padding: 10px; /* Add padding to make the text more visible */
  position: relative;
  z-index: 2; /* Set a higher z-index value */
  color: white;
  font-size: 7em;
  margin-top: -550px;
  opacity: 1;
  transition: text-shadow 1s ease-in;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to bottom, red, blue);
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.7); /* Add white outline with 2px width */
  animation: fade_in 2s ease-in;
}

.stones {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 150vh;
}


.stone_B {
  position: absolute;
  left: -15%;
  top: -10%;
  width: 30%;
  filter: brightness(0.8);
  overflow-x: hidden;
}

.stone_G {
  position: absolute;
  left: 80%;
  top: -10%;
  width: 35%;
  filter: brightness(0.8);
}

.stone_R {
  position: absolute;
  left: -10%;
  top: 25%;
  width: 40%;
  filter: brightness(0.9);
}

.stone_Y {
  position: absolute;
  left: 15%;
  top: -50%;
  width: 50%;
  filter: brightness(0.7)
}
.stone_W {
  position: absolute;
  left: 50%;
  top: 30%;
  width: 50%;
  filter: brightness(0.5);
}
.stone_P {
  position: absolute;
  left: 80%;
  top: 35%;
  filter: brightness(0.9)
}

.stone_win {
  position: absolute;
  left: 20%;
  top: 0;
  width: 60%;
  filter: brightness(0.3);
}

.banner_image {
  position: absolute;
  top: 7em;
  right: 7em;
  width: 70em;
  z-index: 1;
}

/* Apply settings so image on mobile devices */
@media only screen and (max-width: 1080px) { 

  .front_text {
    font-size: 7em;
    margin-top: -900px;
  }

  .stone_B,
  .stone_G,
  .stone_R,
  .stone_Y,
  .stone_W,
  .stone_P {
    display: none;
  }

  .stone_win {
    top: 10%;
    width: 180%;
    left: -40%;
    pointer-events: none;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translate3d(-50%, -60%, 0);
  }
  40% {
    transform: translate3d(-50%, -50%, 0);
  }
  60% {
    transform: translate3d(-50%, -45%, 0);
  }
}

@keyframes fade_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
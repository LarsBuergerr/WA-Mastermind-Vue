<template>
  <div class="container">
    <NavBar/>
    <img src="/assets/images/mastermind_header.png">
    <div class="section">
          <h2>
            How to play
          </h2>
          <table>
            <tr>
              <td><img src="/assets/images/coursers/courser_R.png"></td>
              <td><span> Courser shows the current selected color which is used when placing stones</span></td>
            </tr>
            <tr>
              <td><img src="/assets/images/info/scroll.png"></td>
              <td><span> Scroll down your mouse wheel to change the courser color and therefore the stone placing color</span></td>
            </tr>
            <tr>
              <td><img src="/assets/images/info/left-click.png"></td>
              <td><span> Place your guess on an empty stone in the current row (see point below)</span></td>
            </tr>
            <tr>
              <td><img src="/assets/images/stones/stone_A.png"></td>
              <td><span> Empty stone where you can place your hint (Shows the active row)</span></td>
            </tr>
            <tr>
              <td><img src="/assets/images/hintstones/hstone_W.png"></td>
              <td><span> Hint that shows you that you guess a right color but at the wrong position</span></td>
            </tr>
            <tr>
              <td><img src="/assets/images/hintstones/hstone_R.png"></td>
              <td><span> Hint that shows you that you guess a right color and at the right position</span></td>
            </tr>
          </table>
        </div>
        <div class="section">
          <h2>
            Win/Lose
          </h2>
          <table>
            <tr>
              <td><img src="/assets/images/stones/stone_win.png"></td>
              <td><span> You won the game if you guess the secret code so that all hint stones are red.</span></td>
            </tr>
            <tr>
              <td><img src="/assets/images/stones/stone_A.png"></td>
              <td><span> You lose the game if you used all your tries and you did not guess the secret code.</span></td>
            </tr>
          </table>
        </div>
        <div class="section">
          <h2>
              Frustrated
          </h2>
          So are you also frustrated of weekly repeating deliveries in which you throw out all the changes you made last week? 
          You may check out a other field of specialization like Embedded Systems or Artificial Intelligence.
          For further information see this <a href="https://www.htwg-konstanz.de/fileadmin/pub/studium/Downloads/AIN_Ba_WEB.pdf">Linki</a>
        </div>
      </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'Help-Page',
    components: { NavBar }
}
</script>

<style scoped>
/* Style the container */
.container {
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
}

/* Style the header image */
img {
  max-width: 100%;                                /* 100% of parent container */
  display: block;
  margin: 0 auto;
}

/* Style sections */
.section {
  margin-top: 2rem;
  color: aliceblue;
}

/* Style section headings */
.section h2 {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(to bottom, red, blue);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section td img {
  width: 4rem;
  height: 4rem;
  margin: 0 auto;
  display: block;
  margin-top: 0.5rem;
}

/* Style table */
.section table {
  border-collapse: collapse;
  width: 100%;
  margin: auto;
}

.section th{
  text-align: left;
}

/* Increase font size and icon size on small screens */
@media (max-width: 1080px) {

  .container {
    margin-top: 7rem;
    max-width:max-content;
  }

  .section h2 {
    font-size: 4rem;
  }

  .section td {
    min-width: 8rem; /* Adjust as needed */
  }

  .section td img {
    width: 8rem;
    height: 8rem;
    margin-top: 1rem;
  }

  .section td span {
    font-size: 2rem;
  }
}
</style>
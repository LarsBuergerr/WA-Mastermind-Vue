<template>
  <div class="about">
    <NavBar/>
    <div class="container">
      <img src="/images/mastermind_header.png">
      <div class="section">
        <h2>
          Description
        </h2>
        <ul>
          This is a implementation of the game Mastermind. 
          The game is played against the computer. 
          The game creates a secret code of four to five stones (depends on the chosen difficult).
          The layer tries to guess the code. 
          After each guess the player gets feedback about how many stones are in the right position and how many stones are in the wrong position. 
          The game ends when the player guesses the code or when the player has used all his tries.
        </ul>
      </div>
      <div class="section">
        <h2>
          How to play
        </h2>
        <ul>
          You want to know how to play? 
          Then you should check out the Help page.
        </ul>
      </div>
      <div class="section">
        <h2>
          Authors
        </h2>
        <div class="link-authors">
          <a href="https://github.com/LarsBuergerr">LarsBuergerr</a>
          <a href="https://github.com/Smokey95">Smokey95</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue';

  export default {
    name: 'About-Page',
    components: { NavBar }
  }
</script>

<style scoped>
  .about {
    background-color: rgb(41, 41, 41);
    height: 100vh;
  }

  .container {
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  }

  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }

  .section {
    margin-top: 2rem;
    color: aliceblue;
  }

  .section h2 {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(to bottom, red, blue);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  ul {
    margin: 0rem;
    padding: 0rem;
    text-align: left;
  }
  
  a {
    color: #007BFF;
    text-decoration: none;
  }
  
  .link-authors:hover {
    text-decoration: underline;
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
  
    .section {
      font-size: 3rem;
    }
  }
</style>
<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
      <img class="navbar-icon" src="images/stones/stone_R_nav.png" alt="Menu">
    </button>
  </nav>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">Menu</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link text-dark" @click='route("/")'>
            <img src="images/hintstones/hstone_R.png" class="nav-icon">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" @click='route("/game_multiplayer/createMultiplayer")'>
            <img src ="images/stones/stone_R.png" class="nav-icon">
            Create Multiplayer
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" @click='route("/game_multiplayer/joinMultiplayer")'>
            <img src="images/stones/stone_Y.png" class="nav-icon">
            Join Multiplayer
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" @click='route("/help")'>
            <img src="images/stones/stone_P.png" class="nav-icon">
            Help
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" @click='route("/about")'>
            <img src="images/stones/stone_B.png" class="nav-icon">
            About
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
      name: 'NavBar',
      methods : {
      route(ref){
        window.location.href = ref;
      }
    },
  }
</script>

<style scoped>

  .navbar {
    z-index: 9999;
    background-color: transparent !important;
    padding-top: 1rem;
    padding-left: 1rem;
  }

  .navbar-icon {
    z-index: 9999;
    width: 5rem;
    height: 5rem;
  }

  .navbar-toggler {
    z-index: 9999;
    margin-left: auto; /* Automatically align the navbar icon to the right */
    padding-top: 1rem;
    padding-right: 1rem;
    font-size: 2rem;
    border: none;
    background-color: transparent;
  }

  .nav-link {
    z-index: 9999;
    font-size: 2rem;
    color: aliceblue !important;
  }

  .nav-icon{
    z-index: 9999;
    width: 3rem;
    height: 3rem;
    margin-left: 1rem;
    display: inline-block;
    margin-right: 1rem;
  }

  .nav-link:hover {
    z-index: 9999;
    background: linear-gradient(to bottom, red, rgb(56, 56, 252)); /* Apply linear gradient to the text color */
    -webkit-background-clip: text; /* Set the background clip to text for webkit browsers */
    background-clip: text;
    -webkit-text-fill-color: transparent; /* Set the text fill color to transparent for webkit browsers */
  }

  .offcanvas {
    z-index: 9999;
    background-color: rgba(41, 41, 41, 0.8); /* black with 80% opacity */
  }

  .offcanvas-title {
    z-index: 9999;
    font-size: 2rem;
  }

  .offcanvas-header{
    z-index: 9999;
    color: aliceblue !important;
    margin-left: 1rem;
  }

  .offcanvas .btn-close{
    z-index: 9999;
    color: aliceblue !important;
    font-size: 2rem;
  }

  .orientationMessage{
    z-index: 9999;
    display: none;
    position: absolute;
    z-index: 9999;
    background-color: rgba(41, 41, 41, 0.8);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    padding-top:2rem ;

    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .orientationText {
    z-index: 9999;
    font-size: 2rem;
    background: linear-gradient(to bottom, red, rgb(56, 56, 252));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .orientation-icon{
    z-index: 9999;
    width: 15rem;
    animation: wiggle 1s infinite;
  }

  @keyframes wiggle {
    0% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
    100% { transform: rotate(-5deg); }
  }

  /* Increase font size and icon size on small screens */
  @media (max-width: 1080px) {
  
    .offcanvas {
      --bs-offcanvas-width: 100%;
    }
  
    .offcanvas-title{
      font-size: 5rem;
    }
  
    .offcanvas .btn-close {
      color: aliceblue !important;
      font-size: 5rem;
    }
  
    .nav-link {
      font-size: 5rem; /* Increase font size on small screens */
    }
  
    .nav-icon {
      width: 6rem; /* Increase icon width on small screens */
      height: 6rem; /* Increase icon height on small screens */
    }
  
    /* Padding for the navbar icon*/
    .navbar-toggler {
      padding-top: 1rem;
      padding-left: 1rem;
    
      border: none;
      background-color: transparent;
    }
  } 
</style>
<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-4 text-center"> <!-- Adjusted padding to p-4 -->
              <div class="mb-md-5 mt-md-4 pb-4"> <!-- Adjusted padding to pb-4 -->
                <h2 class="fw-bold mb-2 text-uppercase">Enter Multiplayer Game</h2>
                <p class="text-white-50 mb-4">Please enter your Players Name!</p>
                <div class="form-outline form-white mb-3">
                  <div class="input-field">
                    <input type="text" id="player" required />
                  </div>
                </div>
                <p class="text-white-50 mb-4">Please enter the Game Hash!</p>
                <div class="form-outline form-white mb-3">
                  <div class="input-field">
                    <input type="text" id="game_hash" required />
                  </div>
                </div>
                <button class="btn btn-outline-light btn-lg px-5" type="submit" id="join_multiplayer">Join Game</button>
              </div>  <!-- End of mb-md-5 mt-md-4 pb-4 -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import multiplayerMixin   from '../helper/multiplayerMixin.js';
  import $                  from 'jquery';

  export default {
    name: 'JoinMultiplayerForm',
    mixins: [multiplayerMixin],

    methods: {
    
      multiplayer_join_init() {
        $("document").ready( () => {
          $("#join_multiplayer").click( () => {
            // TODO check that the game exists in the controller map
            this.setCookies(document.getElementById("game_hash").value, "player2");
            window.location.href = "/game_multiplayer/multiplayer";
          })
        })
      },
    },

    created() {
      this.multiplayer_join_init()
    }
  }   
</script>

<style scoped>
  @import '../helper/background.css';
</style>
<template>
    <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-4 text-center"> <!-- Adjusted padding to p-4 -->
              <div class="mb-md-5 mt-md-4 pb-4"> <!-- Adjusted padding to pb-4 -->
                <h2 class="fw-bold mb-2 text-uppercase">New Multiplayer Game</h2>
                <p class="text-white-50 mb-4">Please enter your Players Name!</p>
                <div class="form-outline form-white mb-3">
                  <div class="input-field">
                    <input type="text" id="player" required />
                  </div>
                </div>
                  <button class="btn btn-outline-light btn-lg px-5" type="submit" id="create_multiplayer">Start Game</button>
              </div>  <!-- End of mb-md-5 mt-md-4 pb-4 -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {get} from '@/main.js';
import multiplayerMixin from '@/helper/mixins.js';
import $ from 'jquery';

export default {
    name: 'CreateMultiplayerForm',

    mixins: [multiplayerMixin],

    methods: {
    
    multiplayer_create_init() {
        $("document").ready( () => {
        $("#create_multiplayer").click( async () => {
            this.setCookies("", "player1");
            await get("/game_multiplayer/" + this.getCookie("game") + "/" + this.getCookie("name"))
            window.location.href = "/game_multiplayer/multiplayer";
        })
        })
    },
    },

    created() {
    this.multiplayer_create_init()
    }
}   
</script>

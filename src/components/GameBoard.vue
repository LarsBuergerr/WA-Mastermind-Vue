<template>
  <div class="game">
    <div class="header-container">
      <div class="top-bar"> 
        <img src="/images/mastermind_header_cropped.png" class="header-image">
      </div>
      <div class="center" style="text-align: center;">
        <div class="game-container">
          <!-- Game box (stones) -->
          <div class="game-box">
            <!-- Will be rendered by javascript -->
          </div>
          <!-- Hintstone box -->
          <div class="hintstone-box">
            <!-- Will be rendered by javascript -->
          </div>
        </div>    <!-- End of game-container -->
        <button class="placeStonesButton">Place Stones</button>
      </div>
    </div>
  </div>
</template>

<script>
  import $            from 'jquery';
  import {get, post}  from '../main.js';

  export default {

    name: 'GameBoard',

    data() {
      return {
        stoneArray: ["E", "E", "E", "E"],
        eventListeners: [],
        socket : undefined,
      }
    },

    methods: {
      
      addEventListeners(isMultiplayer) {
        let _this = this;
        document.addEventListener("DOMContentLoaded", () => {
          // Add event listeners after the DOM has fully loaded
          var stoneCells = document.querySelectorAll(".stone-cell");
          
          stoneCells.forEach((element, pos) => {
            element.addEventListener("mouseover", () => {
              this.startChangeStone(element, pos);
            });
            element.addEventListener("mouseout", () =>{
              this.stopChangeStone(element, pos);
            });
          });

          // Place stones button click event
          var placeStonesButton = document.querySelector(".placeStonesButton");
          placeStonesButton.addEventListener("click", () => {
            if(isMultiplayer) {
              this.gameChanges("/game_multiplayer/placeStones/"+this.getCookie("game")+"/"+_this.stoneArray.join(""));
            } else {
              console.log("place stones clicked");
              this.placeStones();
            }
          });
        });
      },

      createErrorPopup(message) {
        var errorPopup = document.createElement("div");
        errorPopup.className = "error-popup";
        errorPopup.innerHTML = message;
        document.body.appendChild(errorPopup);
        setTimeout(function () {
          errorPopup.style.opacity = 0;
          setTimeout(function () {
            errorPopup.remove();
          }, 1000);
        }, 3000); // 3000 milliseconds (3 seconds) until it disappears
      },

      startChangeStone(element, pos) {
        let _this = this;
        var possible_stones = ["R", "G", "B", "Y", "P", "W"];
        var current_stone = element.src.split("_")[1].split(".")[0];
      
        function scrollHandler(event) {
          event.preventDefault();
          if (event.deltaY > 0) {
            current_stone = possible_stones[(possible_stones.indexOf(current_stone) + 1) % possible_stones.length];
          } else {
            current_stone = possible_stones[(possible_stones.indexOf(current_stone) - 1 + possible_stones.length) % possible_stones.length];
          }
          element.src = "/images/stones/stone_" + current_stone + ".png";
          _this.stoneArray[pos] = current_stone;
        }
      
        // Check if it's a touch device
        if ('ontouchstart' in window) {
          element.addEventListener('click', function() {
          console.log("click triggered");
          current_stone = possible_stones[(possible_stones.indexOf(current_stone) + 1) % possible_stones.length];
          element.src = "/images/stones/stone_" + current_stone + ".png";
          _this.stoneArray[pos] = current_stone;
          });
        } else {
          element.addEventListener('wheel', scrollHandler);
        }
        //element.addEventListener("wheel", scrollHandler);
        //eventListeners[pos] = scrollHandler;
      },

      stopChangeStone(element, pos) {
        let _this = this;
        if (_this.eventListeners[pos]) {
          element.removeEventListener("wheel", _this.eventListeners[pos]);
        }
      },

      placeStones() {
        let _this = this;
        if (_this.stoneArray.includes("E")) { // Error check: if there are still empty stones in the array
          this.createErrorPopup("Please fill all stones before placing them!");
        } else {
          console.log("[INFO]  Placing stones: " + _this.stoneArray);
          var stoneArrayString = _this.stoneArray.join("");
          get('/game/placeStones/' + stoneArrayString).then(data => {
            console.log("[INFO]  Server response: ");
            console.log(data);

            // Check data if game is over or not
            if (data.status === "win") {  // ----- WIN GAME -----
              $('.header-image').fadeOut('slow', function () {
                $(this).attr('src', '/images/won.png').fadeIn('slow');
              });
              this.renderEndGameField(data.game, '/images/stones/stone_win.png', '/images/hintstones/hstone_R.png');
              // Change the function of the "Place Stone" button to start a new game
              $('.placeStonesButton').off('click').on('click', this.startNewGame).text('Start New Game');
              console.log("You won!");
            } else if (data.status === "lose") {  // ----- LOSE GAME -----
              $('.header-image').fadeOut('slow', function () {
                $(this).attr('src', '/images/loose.png').fadeIn('slow');
              });
              this.renderEndGameField(data.game, '/images/stones/stone_R.png', '/images/hintstones/hstone_E.png');
              // Change the function of the "Place Stone" button to start a new game
              $('.placeStonesButton').off('click').on('click', this.startNewGame).text('Start New Game');
              console.log("You lost!");
            } else {  // ----- GAME CONTINUES -----
              this.updateGameField(data.game);
            }
          }); 
        } 
      },

      async startNewGame() {
        console.log("[INFO]  Starting new game");
        let res = await get("/game/createGame")
        console.log(res)
        this.updateGameField(res.game);
        // Change the header image back to the original
        $('.header-image').fadeOut('slow', function() {
          $(this).attr('src', '/images/mastermind_header_cropped.png').fadeIn('slow');
        });
        // Change the function of the "Place Stone" button back to place stones
        $('.placeStonesButton').off('click').text('Place Stones');
      },

      updateGameField(data) {
        if(data === undefined) {
          console.log("data undefined");
          return;
        }
        // Update the turn and matrix rows
        var currentTurn = data.turn;

        // Update matrix rows
        var matrixRows = data.matrix.map(function (row) {
          return row.cells.map(function (cell) {
          if (row.row === currentTurn) {
            return '<img src="/images/stones/stone_A.png" class="stone-cell">';
          } else {
            return '<img src="/images/stones/stone_' + cell.value + '.png" class="stone-cell-locked">';
          }
          }).join('');
        });

        // Update hint stone rows
        var hintstoneRows = data.hmatrix.map(function (row) {
            return row.cells.map(function (cell) {
            return '<img src="/images/hintstones/hstone_' + cell.value + '.png" class="hintstone-cell">';
            }).join('');
        });

        // Update the game box HTML
        $('.game-box').html('');
        $('.game-box').append('<h3 id="demo" style="font-family: monospace; font-size: 22px; display: inline-block;">');
        for (var i = 0; i < matrixRows.length; i++) {
          if (i === currentTurn) {
            $('.game-box h3').append('<div class="game-row">' + matrixRows[i] + '</div>');
          } else {
            $('.game-box h3').append('<div class="game-row">' + matrixRows[i] + '</div>');
          }
        }
        $('.game-box').append('</h3>');

        // Update the hintstone box HTML
        $('.hintstone-box').html('');
        $('.hintstone-box').append('<h3 style="font-family: monospace; font-size: 22px; display: inline-block;">');
            
        for (var j = 0; j < hintstoneRows.length; j++) {
          $('.hintstone-box h3').append('<div class="game-row">' + hintstoneRows[j] + '</div>');
        }
            
        $('.hintstone-box').append('</h3>');
            
        // add event listeners to the stones
        var stoneCells = document.querySelectorAll(".stone-cell");
        stoneCells.forEach((element, pos) => {
          element.addEventListener("mouseover", () => {
            this.startChangeStone(element, pos);
          });
          element.addEventListener("mouseout", () => {
            this.stopChangeStone(element, pos);
          });
        });
      },

      renderEndGameField(gameData, stones_img, hintstones_img) {
        // Clear the current game field
        $('.game-box').empty();
        $('.hintstone-box').empty();
        // Create the specified number of rows
        gameData.matrix.forEach(function(row, index) {
          var $row = $('<div>').addClass('game-row');
          var $hintstoneRow = $('<div>').addClass('hintstone-row');
          // Create the specified number of cells in each row
          row.cells.forEach(function() {
            var $cell = $('<img>').addClass('stone-cell-locked');
            $cell.attr('src', stones_img);
            $row.append($cell);
          });
          // Create the specified number of hintstones in each row
          gameData.hmatrix[index].cells.forEach(function() {
            var $hintstone = $('<img>').addClass('hintstone-cell');
            $hintstone.attr('src', hintstones_img);
            $hintstoneRow.append($hintstone);
          });
          // Add the row to the game box
          $('.game-box').append($row);
          $('.hintstone-box').append($hintstoneRow);
        });
      },

      async displayGame() {
        console.log("DISPLAY GAME DU HURENSOHN")
        let res = await get("/game/displayGame")
        console.log(res)
        this.updateGameField(res.game);
      },
            
      /* ------------------------- Multiplayer ------------------------- */

      webSocketInit() {
        let _this = this;
        _this.socket = new WebSocket("ws://127.0.0.1:9000/ws/"+ this.getCookie("game"));
        console.log("socket created")
            
        console.log("game loaded")
        _this.socket.onopen = () => this.heartBeat();
        _this.socket.onclose = () => console.log("Connection closed")
        _this.socket.onmessage = event => {
          if(event.data !== "") {
            if(event.data === "Keep alive"){
              console.log("ping")
            }else{
              let data = JSON.parse(event.data)
              this.checkStatusAndUpdate(data.game);
              console.log(data.current_turn);
              if(data.current_turn !== this.getCookie("pn")) {
                console.log("your turn")
                this.showWaitingForTurnDiv();
              } else {
                this.removeWaitingForTurnDiv();
              }
            }
          } else {
            console.log("no valid json data");
            _this.socket.send("refresh");
          }
        }
        _this.socket.onerror = () => console.log("that was a problem")

        setInterval(() => _this.socket.send("Keep alive"), 20000); // ping every 20 seconds
      },

      heartBeat() {
        let _this = this;
        _this.socket.send("heartBeat");
      },

      async gameChanges(url) {
        let _this = this;
        const res = await post(url);
        if (await res.ok) {
          console.log("page loaded");
          _this.socket.send("refresh");
        } else {
          console.log("page failed loading");
        }
      },
            
      getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      },

      async initMultiplayer() {
        // check if path is multiplayer if yes then init multiplayer
        console.log(window.location.pathname);
        await this.webSocketInit();
        // check if player 2 when yes send start game to server
        if(this.getCookie("pn") === "player2") {
          console.log("start game");
          this.gameChanges("/game_multiplayer/getGame/"+this.getCookie("game"));
        } else {
          // route to waiting page
          console.log("waiting for player 2");
          this.showWaitingForJoinDiv(this.getCookie("game"));
        }
      },

      showWaitingForJoinDiv(gameToken) {
        // Create the overlay and hover-div elements
        var overlay = $('<div class="overlay"></div>');
        var hoverDiv = $('<div class="hover-div"><h1>Waiting for other player to join: </h1></div>');
        // Create a spinner
        var spinner = $('<div class="spinner"></div>');
        // Create a clickable box with the game token
        var tokenBox = $('<div class="token-box">' + gameToken + '</div>');
        // Create a text element
        var textElement = $('<h1>Your game hash is:</h1>');
        // Change the color and text of the token box when clicked
        tokenBox.click( () => {
          var self = $(this);
          self.css('background-color', 'green');
          self.text('Copied to clipboard!');
          this.copyToClipboard(gameToken);
          setTimeout( function() {
          self.css('background-color', ''); // Change this to the original color
          self.text(gameToken); // Change the text back to the game token
          }, 500);
        });
        // Append the elements to the body
        $('body').append(overlay.append(hoverDiv.append(spinner, textElement, tokenBox)));
      },
            
      copyToClipboard(text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      },
            
      showWaitingForTurnDiv() {
        $('body').append('<div class="overlay"><div class="hover-div"><h1>Waiting for other player</h1></div></div>');
      },
            
      removeWaitingForTurnDiv() {
        $('.overlay').remove();
      },
            
      checkStatusAndUpdate(data) {
        console.log("check status and update");
        // check if every hintstone is red in the last row
        if (data.status === "win") {  // ----- WIN GAME -----
          $('.header-image').fadeOut('slow', () =>{
            $(this).attr('src', '/images/won.png').fadeIn('slow');
          });
          this.renderWinGameField(data.game)
          // Change the function of the "Place Stone" button to start a new game
          $('.placeStonesButton').off('click').on('click', this.startNewGame).text('Start New Game');
          console.log("You won!");
        } else if (data.status === "lose") {  // ----- LOSE GAME -----
          $('.header-image').fadeOut('slow', () => {
        $(this).attr('src', '/images/loose.png').fadeIn('slow');
          });
          $('<link>')
          .appendTo('head')
          .attr({type : 'text/css', rel : 'stylesheet'})
          .attr('href', '/stylesheets/displayLoosePage.css');     
          this.renderLooseGameField(data.game)
          // Change the function of the "Place Stone" button to start a new game
          $('.placeStonesButton').off('click').on('click', this.startNewGame).text('Start New Game');
          console.log("You lost!");
        } else {  // ----- GAME CONTINUES -----
          this.updateGameField(data);
        }
      },
    },

    created() {
      console.log(window.location.pathname);
      if (window.location.pathname.includes("game_multiplayer")) {
        console.log("init multiplayer");
        this.initMultiplayer();
      } else {
        console.log("display game");
        this.displayGame();
      }
    },

    mounted() {
      if (!window.location.pathname.includes("game_multiplayer")) {
        this.addEventListeners(false);
      } else {
        this.addEventListeners(true);
      }
    },
  }
</script>

<style>

  .stones img {
    filter: brightness(0.3);
  }

  .stones img:hover {
    animation: glow 1s alternate, hover 1s alternate;
    filter: brightness(0.7);
    transform: translateY(-5px);
  }

  .stones img:not(:hover) {
    animation: reset 1s ease-out; /* Add separate animation for smooth reset */
  }

  @keyframes reset {
    0% {
      filter: brightness(0.7);
      transform: translateY(-5px);
    }
    100% {
      filter: brightness(0.3);
      transform: translateY(0);
    }
  }


  @keyframes glow {
    0% {
      filter: brightness(0.3);
    }
    100% {
      filter: brightness(0.7); /* Adjust the brightness level for the glowing effect */
    }
  }

  @keyframes hover {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-5px);
    }
  }

  .game {
    position: absolute;
    width: 100%;
    top: 100vh;
    left: 0;
    height: 95vh;
    z-index: 4;
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

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px); /* Adjust the blur value as needed */
    background: rgba(0, 0, 0, 0.5);
    z-index: 9998;
  }

  .hover-div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(to bottom, #ff0909, rgb(152, 9, 255), #4117ff);
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    text-align: center;
  }

  .hover-div h1 {
    margin: 0;
    font-size: 24px;
    color: #ffffff;
  }

  .token-box {
    display: inline-block;
    padding: 10px;
    background-color: #666666;
    color: #ffffff;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 15px;
    transition: background-color 0.3s ease;
    position: relative; /* Added relative positioning for the pseudo-element */
  }

  .token-box:hover {
    background-color: #777777; /* Darker gray on hover */
  }
  .header-image {
    margin-top: 2rem;
    max-width: 50rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
  }

  /* sparticles */
  .sparticles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; /* This places the canvas below other content */
  }

  /* game container */
  .game-container {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }

  .game-box,
  .hintstone-box {
    background-color: rgb(87, 87, 87);
    border-radius: 1rem;
    padding: 1rem;
    display: inline-block;
    margin: 0 10px; /* Add margin between the two boxes */
    z-index: 1;
    flex-direction: row;
  }

  .game-row {
    display: flex;
  }

  /* Style the stones */
  .stone-cell,
  .stone-cell-locked,
  .hintstone-cell {
    width: 3rem;
    margin: 0.2rem;
    border-radius: 50%;                 /* Make the cell round */
    transition: background-color 0.3s;  /* Smooth color transition on hover */
    cursor: ns-resize;
  }

  .stone-cell:hover {
    animation: glow 1s infinite alternate, scrollIndication 1s infinite linear;
  }


  /* place stones button animation */
  .placeStonesButton {
    width: 15rem;
    height: 3rem;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 700;
    position: relative;
    z-index: 1;
    border-radius: 1rem;
    margin: auto;
    display: block;
  }

  .placeStonesButton:before {
    content: '';
    background:  linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
  }

  .placeStonesButton:active {
    color: rgb(87, 87, 87);
  }

  .placeStonesButton:active:after {
    background: transparent;
  }

  .placeStonesButton:hover:before {
    opacity: 1;
  }

  .placeStonesButton:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(87, 87, 87);;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  /* Style the error popup */
  .error-popup {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: red;
    color: white;
    padding: 1rem;
    border-radius: 5px;
    opacity: 1;
    transition: opacity 1s;
  }

  /* Keyframe Animation glow */
  @keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
  }

  @keyframes glow {
    0% {
      background-color: transparent;
      box-shadow: 0 0 5px 3px rgba(255, 0, 0, 0.5);
    }
    50% {
      background-color: transparent;
      box-shadow: 0 0 10px 5px rgba(0, 21, 255, 0.9);
    }
    100% {
      background-color: transparent;
      box-shadow: 0 0 15px 3px rgba(48, 0, 121, 0.5);
    }
  }

  @keyframes scrollIndication {
    0% {
      transform: translateY(-2px);
    }
    50% {
      transform: translateY(2px);
    }
    100% {
      transform: translateY(-2px);
    }
  }

  /* Increase font size and icon size on small screens */
  @media (max-width: 1080px) {

    .logo-img {
      margin-top: 7.5rem;
      max-width: 60rem;
    }

    /* Style the stones */
    .stone-cell,
    .stone-cell-locked,
    .hintstone-cell {
      width: 6.5rem;
    }

    .placeStonesButton{
      width: 55rem;
      height: 10rem;
      font-size: 5em;
      position: absolute;
      bottom: 0;
      margin-bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
    }

    .error-popup {
      width: 55rem; /* Increase the width */
      font-size: 2.8rem;;
      height: auto; /* Increase the height */
      position: relative; /* Set the position to relative */
      margin: auto; /* Center the popup */
      bottom: 0; /* Position the popup at the bottom */
      right: auto;
      margin-bottom: 2rem;
    }
  }

  .spinner {
    margin: 100px auto;
    width: 5em;
    height: 5em;
    border: 0.8em solid rgba(87, 87, 87, 0.2);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 2s linear infinite, colorChange 5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
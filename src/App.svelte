<script>
  // Import packages
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  // Import components
  import Windmill_Plaza from "./components/Windmill_plaza.svelte";
  import Windmill_Solo from "./components/Windmill_solo.svelte";
  import Houses from "./components/Houses.svelte";

  // To trigger light changing function in Houses component
  let houses;
  function triggerUpdateOpacity(opacity) {
    houses.updateOpacity(opacity);
  }

  // Handle speed of windmill, and tweening
  let speed = 0; // start from 0. Start sped is handled in stores.js
  import { speedStore } from "./stores.js";

  // Functions to change speed of windmill
  function increaseSpeed() {
    speed = 1;
    speedStore.set(speed); // animate speed increasing to 1
    console.log("new speedstore: ", speedStore);
  }

  function decreaseSpeed() {
    speed = 0;
    speedStore.set(speed); // animate speed decreasing to 0
    console.log("new speedstore: ", speedStore);
  }
</script>

<main>
  <div class="centertext">
    <h1>Monstermølla GE Haliade-X</h1>
    <p>
      General Electric vil plassere Noregs største vindturbin, Haliade-X, i
      Gulen i Sogn. Havvindturbinen skal plasserast på land, og skal vere i
      drift fram til 2050.
    </p>
    <p>
      Turbinen vil bli rundt 280 meter høg. Kor høgt er det eigentleg? Jau, det
      er meir enn dobbelt så høgt som Oslo Plaza:
    </p>
  </div>

  <div class="centercontainer">
    <Windmill_Plaza/>
  </div>

  <div class="centertext">
    <p>
      Årsproduksjonen til vindmølla er estimert til 60-63 GWh. Dette er nok til
      å dekkje forbruket til 3750-4000 hushaldningar.
    </p>
  </div>

  <div class="centercontainer">
    <Windmill_Solo/>
  </div>

  <div class="centercontainer">
    <button
      on:click={() => {
        increaseSpeed();
        triggerUpdateOpacity(1);
      }}>Start</button
    >
    <button
      on:click={() => {
        decreaseSpeed();
        triggerUpdateOpacity(0);
      }}>Stop</button
    >
  </div>
  <div class="buildingcontainer">
    <Houses bind:this={houses} />
  </div>

  <div class="centercontainer">
    <p>GE Haliade-X vert meir enn dobbelt så høg som Oslo Plaza</p>
  </div>
</main>

<style>
  :global(body) {
    background-color: #0089d1;
    padding: 0px;
    font-family: "Roboto", sans-serif;
  }

  p,
  h1,
  h2 {
    margin: 20px 20px 20px 20px;
    line-height: 1.2;
    color: white;
    text-align: left;
    max-width: 900px;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .centercontainer {
    display: flex;
    justify-content: center;
    margin: 25px 0px 25px 0px;
  }

  .centertext {
    margin: auto;
    display: block;
    max-width: 600px;
    text-align: left;
  }

  .buildingcontainer {
    display: flex;
    justify-content: center;
    margin: 0px;
    padding: 25px;
    /*  background-color: #0078b8; */
  }
</style>

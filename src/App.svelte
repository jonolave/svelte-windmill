<script>
  // Import packages
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  // Import components
  import Windmill_Plaza from "./components/Windmill_plaza.svelte";
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
    console.log("new speedstore: ", speedStore)
  }

  function decreaseSpeed() {
    speed = 0;
    speedStore.set(speed); // animate speed decreasing to 0
    console.log("new speedstore: ", speedStore)

  }
</script>

<main>
  <div class="centercontainer">
    <h1>
      På det høyeste blir GE Haliade-X mer enn dobbelt så høy som Oslo Plaza
    </h1>
  </div>

  <div class="centercontainer">
    <Windmill_Plaza />
  </div>

  <div class="centercontainer">
    <h2>
      Vindmøllens årlige produksjon er estimert til 60-63 GWh, nok til å dekke
      forbruket til 3750-4000 husholdninger
    </h2>
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
</main>

<style>
  :global(body) {
    background-color: #0089d1;
    padding: 0px;
  }

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

  .buildingcontainer {
    display: flex;
    justify-content: center;
    margin: 0px;
    padding: 25px;
    background-color: #0078b8;
  }
</style>

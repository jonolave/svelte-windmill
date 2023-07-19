<script>
  import Windmill_Plaza from "./components/Windmill_plaza.svelte";
  import Houses from "./components/Houses.svelte";

  // To trigger light changing function in Houses component
  let houses;
  function triggerUpdateOpacity(opacity) {
    houses.updateOpacity(opacity);
  }


  let speed = "0.5";
  let opacity = 0.5;
</script>

<main>
  <div class="centercontainer">  <h1>
    På det høyeste blir GE Haliade-X mer enn dobbelt så høy som Oslo Plaza
  </h1>
</div>

  <div class="centercontainer">
    <Windmill_Plaza {speed} />
  </div>

  <div class="centercontainer"> <h2>
    Vindmøllens årlige produksjon er estimert til 60-63 GWh, nok til å dekke
    forbruket til 3750-4000 husholdninger
  </h2>
</div>
 
  <div class="centercontainer">
    <button
      on:click={() => {
        speed = (parseFloat(speed) + 1).toFixed(1);
        triggerUpdateOpacity(1);
        // console.log("Speed after button click: ", speed);
      }}>Start</button
    >
    <button
      on:click={() => {
        speed = 0;
        triggerUpdateOpacity(0)
        // console.log("Speed after button click: ", speed);
      }}>Stop</button
    >
  </div>
  <div class="buildingcontainer">
    <Houses bind:this={houses}  />
  </div>
</main>

<style>
  :global(body) {
    background-color: #0089d1;
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
    margin: 25px 0px 25px 0px;
    background-color: #0078b8;
  }
</style>

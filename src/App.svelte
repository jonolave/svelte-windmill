<script>
  import Windmill_Plaza from "./components/windmill_plaza.svelte";
  import Houses from "./components/houses.svelte";

  let speed = "0.5";
  let opacity = 0.5;
</script>

<main>
  <h1>
    På det høyeste blir GE Haliade-X mer enn dobbelt så høy som Oslo Plaza
  </h1>

  <div class="centercontainer">
    <Windmill_Plaza {speed} />
  </div>

  <h2>
    Vindmøllens årlige produksjon er estimert til 60-63 GWh, nok til å dekke forbruket til 3750-4000 husholdninger
  </h2>

  <div class="centercontainer">
    <button
      on:click={() => {
        speed = (parseFloat(speed) + 1).toFixed(1);
        opacity = 1;
        console.log("Speed after button click: ", speed);
      }}>Start</button
    >
    <button
      on:click={() => {
        speed = 0;
        opacity = 0;
        console.log("Speed after button click: ", speed);
      }}>Stop</button
    >
  </div>
  <div class="buildingcontainer">
    <Houses {opacity} />
  </div>
</main>

<style>
  :global(body) {
    background-color: #0089d1;
  }

  h1 {
    margin: 20px 20px 20px 20px;
    font-size: 2rem;
    line-height: 1.2;
    color: white;
    text-align: center;
  }

  h2 {
    margin: 20px 20px 20px 20px;
    font-size: 1.5rem;
    line-height: 1.2;
    color: white;
    text-align: center;
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
    background-color: #0078B8;
  }
</style>

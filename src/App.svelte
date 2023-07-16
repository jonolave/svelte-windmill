<script>
  import Windmill_Plaza from "./components/windmill_plaza.svelte";
  import Houses from "./components/houses.svelte";

  let speed = "0.5";
</script>

<main>
  <h1>
    På det høyeste blir GE Haliade-X mer enn dobbelt så høy som Oslo Plaza
  </h1>

  <div class="windmillcontainer">
    <Windmill_Plaza {speed} />
   
        <button
      on:click={() => {
        speed = (parseFloat(speed) + 1).toFixed(1);
        console.log("Speed after button click: ", speed);
      }}>More!</button
    >

    <button
      on:click={() => {
        speed = 0;
        console.log("Speed after button click: ", speed);
      }}>Off</button
    >
   
  </div>
  <Houses />
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

  .windmillcontainer {
    width: 100%;
    max-height: 70vh;
    padding-bottom: 75%; /* adjust to match SVG's aspect ratio */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

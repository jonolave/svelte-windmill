<script>
  import { onMount, onDestroy } from "svelte";

  let totalHouses = 50;
  let houseWidth = 24;
  let houseHeight = 30;
  let gap = 20;
  let houses = [];
  let columns;
  let rows;
  let svgHeight;

  // calculate how many houses can fit horizontally
  const updateColumns = () => {
    // Update the number of columns based on window's width
    columns = Math.floor(window.innerWidth / (houseWidth + gap));
    rows = Math.ceil(Number(totalHouses) / Number(columns));
    svgHeight = Number(rows) * Number(houseHeight+gap);
    console.log("Rows: ", rows);
    console.log("SVG height: ", svgHeight);
    updateHouses();
  };

  // populate the houses array based on the current value of columns and rows.
  const updateHouses = () => {
    houses = [];
    let count = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (count >= totalHouses) {
          return;
        }
        houses.push({
          x: j * (houseWidth + gap) + gap / 2,
          y: i * (houseHeight + gap) + gap / 2,
        });
        count++;
      }
    }
  };

  // add and a resize event listener to the window
  onMount(() => {
    window.addEventListener("resize", updateColumns);
    updateColumns();
  });
  // remove a resize event listener to the window
  onDestroy(() => {
    window.removeEventListener("resize", updateColumns);
  });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  style={`width: 100%; height: ${svgHeight}px;`}
>
  <rect width="100%" height="100%" fill="#ffffff" />

  {#each houses as house (house.x + "-" + house.y)}
    <use
      href="#house"
      x={house.x}
      y={house.y}
      width={houseWidth}
      height={houseHeight}
    />
  {/each}

  <symbol id="house" viewBox="0 0 24 30">
    <!-- your house SVG here -->
    <g class="hus export">
      <path
        fill="#003550"
        d="m4 8.215-4 4.107V30h24V12.322L12 0 6.5 5.648V2H4v6.215Z"
        class="hus"
      />
      <g class="vindu">
        <path fill="#FFE973" d="M9.987 7h4v7h-4z" class="Rectangle 18" />
        <path fill="#FFE973" d="M14 18h6v7h-6z" class="Rectangle 19" />
        <path fill="#FFE973" d="M4 18h6v7H4z" class="Rectangle 20" />
      </g>
    </g>
  </symbol>
</svg>

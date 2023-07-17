<script>
  import { onMount, onDestroy } from "svelte";
  import Building from "./building.svelte";

  let opacity = 0.5; // set initial opacity

  let totalHouses = 5;
  let houseWidth = 24;
  let houseHeight = 30;
  let houses = [];
  let gap = 15;
  let columns;
  let rows;
  let svgHeight;
  let maxSVGWidth = 0;
  let maxSVGHeight = 0;

  // Define positions for each window within the house
  const windowPositions = [
    { x: 10, y: 8, width: 4, height: 4 },
    { x: 4, y: 18, width: 5, height: 6 },
    { x: 15, y: 18, width: 5, height: 6 },
  ];

  // calculate how many houses can fit horizontally
  const updateColumns = () => {
    // Update the number of columns based on window's width
    let width = Math.min(window.innerWidth, 900);
    columns = Math.floor(width / (houseWidth + gap));
    rows = Math.ceil(Number(totalHouses) / Number(columns));
    svgHeight = Number(rows) * Number(houseHeight + gap);
    maxSVGWidth = columns * (houseWidth + gap);
    maxSVGHeight = rows * (houseHeight + gap);

    // console.log("Rows: ", rows);
    // console.log("SVG height: ", svgHeight);
    // console.log("houses array: ", houses);
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

        let houseWindows = windowPositions.map((window, index) => {
          return {
            ...window,
            opacity: opacity, // set initial opacity to 0
            updateOpacity: function (newOpacity) {
              this.opacity = newOpacity;
            },
          };
        });

        // push each house with position and
        houses.push({
          x: j * (houseWidth + gap) + gap / 2,
          y: i * (houseHeight + gap) + gap / 2,
          windows: houseWindows,
          updateWindows: function (newOpacity) {
            this.windows = this.windows.map((window) => {
              return {
                ...window,
                opacity: newOpacity,
              };
            });
            // Create a new houses array to trigger re-render
            this.windows = this.windows.map((window) => {
              return {
                ...window,
                opacity: newOpacity,
              };
            });
          },
        });
        count++;
      }
    }
  };

  export function updateOpacity(newOpacity) {
  houses.forEach((house, i) => {
    setTimeout(() => {
      house.updateWindows(newOpacity);
      houses = [...houses]; // force Svelte to detect a change in the `houses` array
    }, i * 200); 
  });
  console.log("run updateOpacity: ", newOpacity);
}


  // add a resize event listener to the window
  // Runs after the component is added to the DOM
  onMount(() => {
    window.addEventListener("resize", updateColumns);
    updateColumns();
  });
  // remove a resize event listener to the window
  // runs just before the component is removed from the DOM.
  onDestroy(() => {
    window.removeEventListener("resize", updateColumns);
  });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  id="housessvg"
  style={`width: 100%; height: ${svgHeight}px;`}
  viewBox="0 0 {maxSVGWidth} {maxSVGHeight}"
>
  <!-- <rect width="100%" height="100%" fill="#006499" /> -->

  {#each houses as house (house.x + "-" + house.y)}
    <g transform={`translate(${house.x}, ${house.y})`}>
      <Building windows={house.windows} />
    </g>
  {/each}
</svg>

<style>
  #housessvg {
    max-width: 900px;
  }
</style>

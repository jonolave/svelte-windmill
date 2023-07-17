<script>
  import { onMount, onDestroy } from "svelte";
  import House from "./building.svelte";

  export let opacity = 0; // set initial opacity

  let totalHouses = 50;
  let houseWidth = 24;
  let houseHeight = 30;
  let houses = [];
  let gap = 15;
  let columns;
  let rows;
  let svgHeight;
  let maxSVGWidth = 0;
  let maxSVGHeight = 0;

 // Define the reactive statement for houses
 // will run initially when the component is initialized and rerun whenever opacity or houses change
 $: {
    houses = houses.map(house => {
      return {
        ...house,
        windows: house.windows.map(window => {
          return {
            ...window,
            opacity: opacity
          }
        })
      }
    })
  }


  // Define positions for each window within the house
  const windowPositions = [
    { x: 10, y: 8, width: 4, height: 4 },
    { x: 4, y: 18, width: 5, height: 6 },
    { x: 15, y: 18, width: 5, height: 6 },
  ];

  // calculate how many houses can fit horizontally
  const updateColumns = () => {
    // Update the number of columns based on window's width
    columns = Math.floor(window.innerWidth / (houseWidth + gap));
    rows = Math.ceil(Number(totalHouses) / Number(columns));
    svgHeight = Number(rows) * Number(houseHeight + gap);
    maxSVGWidth = columns * (houseWidth + gap);
    maxSVGHeight = rows * (houseHeight + gap);

    console.log("Rows: ", rows);
    console.log("SVG height: ", svgHeight);
    console.log("houses array: ", houses);
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

        // windows and delay
        let houseWindows = windowPositions.map((window) => {
          return {
            ...window,
            opacity: opacity,
            updateOpacity: function (newOpacity) {
              this.opacity = newOpacity;
            },
          };
        });

        // Push each house with its position and windows state
        houses.push({
          x: j * (houseWidth + gap) + gap / 2,
          y: i * (houseHeight + gap) + gap / 2,
          windows: houseWindows,
          updateWindows: function () {
            this.windows.forEach((window) => window.updateOpacity());
          },
        });
        count++;
      }
    }
    // Random delay
    houses.forEach((house, i) => {
      setTimeout(() => {
        house.updateWindows();
      }, Math.random() * 2000); // delay up to 2 seconds
    });
  };

  const updateOpacity = (newOpacity) => {
    houses.forEach((house) => {
      house.windows.forEach((window) => {
        window.updateOpacity(newOpacity);
      });
    });
  };

  // add a resize event listener to the window
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
  id="housessvg"
  style={`width: 100%; height: ${svgHeight}px;`}
  viewBox="0 0 {maxSVGWidth} {maxSVGHeight}"
>
  <!-- <rect width="100%" height="100%" fill="#006499" /> -->

  {#each houses as house (house.x + "-" + house.y)}
    <g transform={`translate(${house.x}, ${house.y})`}>
      <House windows={house.windows} />
    </g>
  {/each}
</svg>

<style>
  #housessvg {
    max-width: 900px;
  }
</style>

<script>
  import { construct_svelte_component_dev } from "svelte/internal";

  // receive array of windows for each house
  export let windows = [];

  // this statement will run every time the 'windows' variable changes
  $: {
    console.log("Windows:", windows);
  }
</script>

<g>
  <path
    fill="#003C5A"
    d="m4 8.215-4 4.107V30h24V12.322L12 0 6.5 5.648V2H4v6.215Z"
    class="hus"
  />

  {#each windows as window}
    <rect
      x={window.x}
      y={window.y}
      width={window.width}
      height={window.height}
      fill={`rgba(255, 233, 115, ${window.opacity})`}
    />
  {/each}
</g>

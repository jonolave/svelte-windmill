<script>
  import { onMount } from "svelte";

  // Import speedStore (the gradually changing speed)
  import { speedStore } from '../stores.js';

  // windmill animation
  let svgElement;
  let animation;

  onMount(() => {
    animation = svgElement.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: 10000, // 10 seconds
        iterations: Infinity,
        easing: "linear",
      }
    );

    const unsubscribe = speedStore.subscribe((value) => {
      if (animation) {
        animation.playbackRate = value;
      }
    });

    // This function will be called when the component is destroyed
    return unsubscribe;
  });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 454 357"
  id="windmillsvg"
>
  <title lang="en" class="s-XsEmFtvddWTw"
    >Oslo Plaza and the Haliade-X windmill placed next to each other.</title
  >
  <desc lang="en" class="s-XsEmFtvddWTw"
    >Oslo Plaza is 117 meters tall, while the Haliade-X will be about 280 meters
    including the blades.</desc
  >
  <style class="s-XsEmFtvddWTw">
    .height-text {
      font-family: Verdana;
      font-size: 16px;
      font-weight: bold;
      text-anchor: middle;
      fill: white;
    }
    .name-text {
      font-family: Verdana;
      font-size: 12px;
      text-anchor: middle;
      fill: white;
    }
    * {
    }
  </style>
  <rect width="100%" height="100%" fill="#0089d1" class="bg" />
  <g class="windmill">
    <path fill="#0089D1" d="M.293 0h453v357h-453z" />
    <g class="haliade">
      <path
        fill="url(#a)"
        d="M311.293 129h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2.239c1.39 60.513 1.174 136.752 1.156 142.422-.001.221.143.38.354.445l10.003 3.056c.21.065.354.259.354.479v1.098a.5.5 0 0 1-.5.5h-28.256a.5.5 0 0 1-.5-.5v-1.098c0-.22.144-.414.354-.479l10.004-3.056c.21-.065.354-.224.354-.445-.019-5.67-.235-81.909 1.155-142.422h-2.239a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
        class="stem"
      />
      <path
        fill="#fff"
        d="M379.141 26.953c-.236-.023-.684.986-.684.986-20.964 48.684-43.486 80.842-64.763 103.24-19.822 1.513-61.783-5.199-121.381 2.947-.303.045-1.11.269-1.009.482.101.213 1.199.101 1.199.101 52.64-6.185 91.756-2.757 121.784 4.47 11.216 16.415 26.388 56.114 63.251 103.656.191.235.785.829.919.627.134-.19-.515-1.087-.515-1.087-31.676-42.499-48.27-78.074-57.021-107.7 8.605-17.927 35.395-50.903 58.141-106.602.112-.28.325-1.098.09-1.109l-.011-.011Z"
        class="blades"
        bind:this={svgElement}
      />

      <path
        fill="url(#b)"
        d="M320.293 135c0 2.212-1.788 4-4 4-2.212 0-4-1.788-4-4 0-2.212 1.788-4 4-4a3.994 3.994 0 0 1 4 4Z"
        class="cap"
      />
      <text class="height-text" x="316" y="318">ca. 280 m</text>
      <text class="name-text" x="316" y="337">GE Haliade-X</text>
    </g>
    <g class="Plaza">
      <path
        fill="#fff"
        d="M122.293 188.68h7V172l16.286 16.68V289h-23.286V188.68Z"
        class="glass"
        opacity=".8"
      />
      <path fill="#fff" d="M129.293 289h5V177.125l-5-5.121V289Z" class="heis" />
      <text class="height-text" x="134" y="318">117 m</text>
      <text class="name-text" x="134" y="337">Oslo Plaza</text>
    </g>
  </g>

  <defs>
    <radialGradient id="b" class="b" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#fff" />
      <stop offset="100%" stop-color="#E3E3E3" />
    </radialGradient>
    <linearGradient
      id="a"
      x1="0"
      x2="0"
      y1="0"
      y2="1"
      class="a"
      gradientUnits="objectBoundingBox"
    >
      <stop offset="0" stop-color="#E3E3E3" />
      <stop offset="1" stop-color="#fff" />
    </linearGradient>
  </defs>
</svg>

<style>
  .blades {
    transform-origin: 316px 135px;
  }

  #windmillsvg {
    max-width: 600px; /* adjust this value as needed */
    max-height: 600px; /* adjust this value as needed */
  }
</style>

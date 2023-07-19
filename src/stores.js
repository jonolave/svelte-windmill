import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";

export let speedStore = tweened(0, { duration: 2000, easing: cubicOut });

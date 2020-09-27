<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, slide, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  export let open = false;
  let dispactch = createEventDispatcher();

  const onBackdropClick = () => {
    dispactch('backdropClick', {clicked: 'yaya'});
  };

</script>

{#if open}
  <div transition:slide class="backdrop" class:isOpen={open} on:click={onBackdropClick}>
    <div in:fade out:scale|local class="modal" on:click|self>
      <slot  ></slot>
      <slot name="footer"></slot>
    </div>
  </div>
{/if}

<style>
</style>

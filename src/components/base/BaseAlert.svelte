<script>
  export let red = false;
  export let green = false;
</script>

<div
  class="relative mx-auto inline-flex items-center overflow-hidden rounded-lg border p-2 px-4
     {green ? 'border-green-500 bg-green-50' : ''} {red
    ? 'border-red-500 bg-red-50'
    : ''}"
>
  <slot />
</div>

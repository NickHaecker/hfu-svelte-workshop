<script>
  export let red = false;
  export let green = false;
</script>

<div
  class="mx-auto inline-flex rounded-lg border p-2 px-6
  {green ? 'border-green-500 bg-green-50' : ''} {red
    ? 'border-red-500 bg-red-50'
    : ''}"
>
  <slot />
</div>

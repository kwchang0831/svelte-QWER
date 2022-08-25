<script lang="ts">
  export let name: string;
  export let icon: string | undefined;
</script>

<div class="flex items-center justify-start cursor-pointer">
  <div class="{icon} !w8 !h8 shrink-0" />
  <div class="px2">{name}</div>
</div>

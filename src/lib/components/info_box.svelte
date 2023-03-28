<script lang="ts">
  export let statusName: string | undefined = undefined;
  export let statusType: 'info' | 'tip' | 'caution' | 'error' | 'danger' | undefined = undefined;
</script>

{#if statusType}
  <aside
    class="infobox flex flex-col border-l-5 my4 py1 px4 {statusType === 'info'
      ? 'bg-blue-400/[0.5] border-blue'
      : ''} {statusType === 'tip' ? 'bg-emerald-400/[0.5] border-emerald' : ''} {statusType === 'caution'
      ? 'bg-orange-400/[0.5] border-orange'
      : ''} {statusType === 'error' ? 'bg-red-400/[0.5] border-red' : ''} {statusType === 'danger'
      ? 'bg-red-600/[0.5] border-red-800'
      : ''}">
    <div class="flex items-center gap2">
      <div
        class:i-ic-outline-info={statusType === 'info'}
        class:i-ic-outline-tips-and-updates={statusType === 'tip'}
        class:i-ic-round-warning-amber={statusType === 'caution'}
        class:i-ic-round-error-outline={statusType === 'error'}
        class:i-ic-outline-dangerous={statusType === 'danger'}
        class="w5 h5" />
      <p class="font-600">
        {#if statusName}
          {statusName}
        {:else}
          {statusType.toUpperCase()}
        {/if}
      </p>
    </div>

    <section>
      <slot />
    </section>
  </aside>
{/if}

<style lang="scss">
  // aside {
  //   --at-apply: 'bg-red border-red-500 ';
  // }
</style>

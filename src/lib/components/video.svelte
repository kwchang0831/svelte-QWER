<script lang="ts">
  let className: string | undefined = undefined;
  export { className as class };

  export let autoplay = true;
  export let loop = true;
  export let poster: string | undefined = undefined;
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let id: string | undefined = undefined;

  export let webm: string | undefined = undefined;
  export let mp4: string | undefined = undefined;
</script>

<video
  {id}
  {autoplay}
  {loop}
  {width}
  {height}
  class="!h-full !w-auto m-auto {className ?? ''}"
  controls
  {poster}
  data-poster={poster}>
  {#if mp4}
    <source {title} src={mp4} type="video/mp4" />
  {/if}
  {#if webm}
    <source {title} src={webm} type="video/webm" />
  {/if}
  <track kind="captions" />
</video>

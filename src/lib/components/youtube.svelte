<script lang="ts">
  import { siteConfig } from '$config/site';

  export let id: string | undefined = undefined;
  export let list: string | undefined = undefined;
  export let playlist: string | undefined = undefined;
  export let start: string | undefined = undefined;
  export let autoplay = false;
  export let disablekb = false;
  export let controls = true;
  export let fs = true;
  export let loop = false;

  const src = `https://www.youtube.com/embed/${id}?${list ? `listType=playlist&amp;list=${list}&amp;` : ''}${
    playlist ? `playlist=${playlist}&amp;` : ''
  }${start ? `start=${start}&amp;` : ''}${autoplay ? 'autoplay=1&amp;' : ''}${disablekb ? 'disablekb=1&amp;' : ''}${
    controls ? '' : 'controls=0&amp;'
  }${fs ? '' : 'fs=0&amp;'}${
    loop ? 'loop=1&amp;' : ''
  }iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1&amp;origin=${encodeURI(
    siteConfig.url,
  )}`;
</script>

<div class="relative my4">
  <iframe
    {src}
    title="Youtube Player"
    allowfullscreen
    allowtransparency
    loading="lazy"
    allow="autoplay"
    class="w-full h-auto aspect-video" />
</div>

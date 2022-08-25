<script lang="ts">
  import { siteConfig } from '$config/site';

  export let id: string | undefined = undefined;
  export let list: string | undefined = undefined;
  export let playlist: string | undefined = undefined;
  export let start: string | undefined = undefined;
  export let autoplay: boolean = false;
  export let disablekb: boolean = false;
  export let controls: boolean = true;
  export let fs: boolean = true;
  export let loop: boolean = false;

  const src = `https://www.youtube.com/embed/${id}?${list ? `listType=playlist&list=${list}&` : ''}${
    playlist ? `playlist=${playlist}&` : ''
  }${start ? `start=${start}` : ''}${autoplay ? 'autoplay=1&' : ''}${disablekb ? 'disablekb=1&' : ''}${
    controls ? '' : 'controls=0&'
  }${fs ? '' : 'fs=0&'}${loop ? 'loop=1' : ''}origin=${
    siteConfig.url
  }&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1`;
</script>

<div class="plyr__video-embed relative pb-[56.25%] mb-2 js-player">
  <iframe {src} title="Plyr video player" allowfullscreen allowtransparency loading="lazy" allow="autoplay" />
</div>

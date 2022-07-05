
<script>
  import '../styles/prism.scss'
  import '../styles/prose.scss'
</script>

<div class="relative flex flex-nowrap justify-center">
  <div class="max-w-screen-md flex-1" />

  <div class="flex-none max-w-[55rem] w-full prose prose-slate dark:prose-invert md:(rounded-2xl bg-white/[0.5] dark:bg-[#252525]/[0.5])">
    <slot name="post_heading">
    </slot>
    <slot name="post_content">
    </slot>
  </div>

  <div class="max-w-screen-md flex-1 relative">
    <slot name="post_toc"></slot>
  </div>
</div>

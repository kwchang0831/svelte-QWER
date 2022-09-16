import tippy, { type Props } from 'tippy.js';

export default function tooltip(node: HTMLElement, params: Partial<Props> = {}): SvelteActionReturnType {
  if (!tippy) return;

  const defaultParams = {
    appendTo: () => document.body,
    theme: 'material',
    animation: 'shift-away',
    // allowHTML: true,
  };
  const custom = params.content;
  const title = node.title;
  const label = node.getAttribute('aria-label');
  const content = String(custom || title || label);

  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
  // if (!label) return; //node.setAttribute('aria-label', content);

  // node.title = '';

  // https://atomiks.github.io/tippyjs/v6/all-props/
  const tip = tippy(node, { content, ...{ ...defaultParams, ...params } });

  return {
    update: () => tip.setProps({ content, ...params }),
    destroy: () => tip.destroy(),
  };
}

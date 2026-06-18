import { c as createComponent } from './astro-component_BPwvYTEJ.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate } from './entrypoint_Bnw_AB5_.mjs';

const prerender = false;
const $$KeystaticAstroPage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Keystatic", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/dani/projects/ivpt/ivpt-web/node_modules/@keystatic/astro/internal/keystatic-page.js", "client:component-export": "Keystatic" })}`;
}, "/home/dani/projects/ivpt/ivpt-web/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", void 0);

const $$file = "/home/dani/projects/ivpt/ivpt-web/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$KeystaticAstroPage,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { visit } from 'unist-util-visit';

// Plugin untuk membersihkan backslash escape pada kurung kurawal di blok math
// Dan mendukung penulisan rumus via ```math blocks
// Plugin untuk mengubah [ ] kembali ke { } di level rehype (HTML)
function rehypeMathFix() {
	return (/** @type {any} */ tree) => {
		visit(tree, 'element', (node) => {
			if (
				node.tagName === 'div' || node.tagName === 'span' || 
				(node.properties?.className && Array.isArray(node.properties.className) && 
				 node.properties.className.includes('math'))
			) {
				// Cari text node di dalam elemen math
				if (node.children) {
					for (const child of node.children) {
						if (child.type === 'text' && child.value) {
							child.value = child.value
								.split('[').join('{')
								.split(']').join('}')
								.split('\\_').join('_');
						}
					}
				}
			}
		});
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://msyamsudin.github.io',
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeMathFix, rehypeKatex],
	},
	integrations: [
		mdx(),
		sitemap(),
	],
});

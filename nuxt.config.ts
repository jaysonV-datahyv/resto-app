// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  modules: ["nuxt-primevue"],
  primevue: {
    // importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
    importPT: { from: path.resolve(__dirname, './presets/aura/') },     //import and apply preset
    components: {
      include: '*',
      exclude: ['Chart', 'Editor'],
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',    
    options: {
      unstyled: true,
    }    
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
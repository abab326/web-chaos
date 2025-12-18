import type { App } from 'vue';

const modules = import.meta.glob('./**/index.ts', { eager: true });

const moduleInstalls = Object.values(modules).map((module: any) => module.default);

export default {
  install(app: App) {
    moduleInstalls.forEach((module: any) => {
      app.use(module);
    });
  },
};

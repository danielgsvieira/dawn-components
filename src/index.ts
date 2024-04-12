import { App } from 'vue';
import { components } from './components';
import DDatepicker from './components/Datepicker/DDatepicker.vue';

const dawn = {
  install: (app: App): void => {
    Object.keys(components).forEach((key) => {
      app.component(key, components[key]);
    });
  },
};

export { dawn, DDatepicker };

import {
  ElButton,
  ElInput,
  ElBadge,
  ElImage,
  ElTooltip,
  ElDialog
} from 'element-plus';

const components = [
  ElInput,
  ElButton,
  ElBadge,
  ElImage,
  ElTooltip,
  ElDialog
];

const plugins = [
  // nothing
];

export default function install(app) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
}

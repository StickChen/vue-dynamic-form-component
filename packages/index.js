import DynamicForm from './dynamic-form/index'
import Vue from "vue";

const install = function (Vue) {
  if (install.installed) {
    return false
  }
  install.installed = true
  DynamicForm.install(Vue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // Look for files in the current directory
  './components/',
  // Do not look in subdirectories
  false,
  // Only include "_base-" prefixed .vue files
  /[\w-]+\.vue$/
)

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // Get the PascalCase version of the component name
  const componentName = fileName
  // Remove the "./_" from the beginning
    .replace(/^\.\//, '')
  // Remove the file extension from the end
    .replace(/\.\w+$/, '')
    // Split up kebabs
    .split('-')
    // Upper case
    .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // Concatenated
    .join('')

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})

export default DynamicForm

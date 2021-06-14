// auto-complete components
const files = require.context("../../../System", true, /\.js$/);
const components = []
// eslint-disable-next-line array-callback-return
files.keys().map(key => {
  if (key.includes("./index.js") || key.includes("./components/")) {
    return false;
  }
  const jsonObj = {};

  const newkey = key.split(".")[1];
  const path = `/system${newkey.toLowerCase()}`;
  
  const component = files(key).default;

  jsonObj.path = path;
  jsonObj.key = newkey;
  jsonObj.component = component;
  
  components.push(jsonObj);
})

export default components;
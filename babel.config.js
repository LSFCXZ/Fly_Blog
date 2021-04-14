module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@babel/preset-env', { modules: false }]
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
// {
//   "presets": [["es2015", { "modules": false }]],
//     "plugins": [
//       [
//         "component",
//         {
//           "libraryName": "element-ui",
//           "styleLibraryName": "theme-chalk"
//         }
//       ]
//     ]
// }

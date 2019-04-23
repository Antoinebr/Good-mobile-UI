// Inside vue.config.js
module.exports = {

    baseUrl: "/",
    // ...other vue-cli plugin options...
    pwa: {
      name: "The good mobile Ui",
      short_name: "Good mobile Ui",
      themeColor: '#b93028',
      background_color: "#ffffff",
      msTileColor: '#ffffff"',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
    
      iconPaths:{
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/icon-152x152.png',
            msTileImage: 'img/icons/icon-144x144.png'
      },
      // configure the workbox plugin
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: './src/sw.js',
        // ...other Workbox options...
      }
    }
  }
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "readers-in",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "Readers"
      },
      { name: "theme-color", content: "#DE1F16" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/favicon.ico" }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/scss/styles.scss"],

  /*
   ** Router
   */
  router: {
    middleware: [
      "header",
      "currency",
      "store-config",
      "customer",
      "card-id",
      "card-data"
    ],
    prefetchLinks: true
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/vue-select", mode: "client" },
    { src: "~/plugins/vue-html-to-paper", mode: "client" },
    { src: "~/plugins/vue-slider", mode: "client" }
  ],

  generate: { fallback: '404.html' },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/device",
    "@nuxtjs/google-analytics",
  ],
  googleAnalytics: {
    id: 'UA-28813293-1',
    debug: {
      enabled: true,
      sendHitTask: true,
      screenview: true
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "bootstrap-vue/nuxt",
    "@nuxtjs/apollo",
    "cookie-universal-nuxt",
    "nuxt-i18n",
    "nuxt-interpolation",
    // "@nuxtjs/cloudinary",
    /*[
      "nuxt-facebook-pixel-module",
      {
        track: "PageView",
        pixelId: "864204630740408",
        autoPageView: true,
        disabled: false
      }
    ],*/
    [
      '@nuxtjs/recaptcha', {
        siteKey: '6LfPGUwbAAAAAFIYbsiw3NQeS4MKYlZcupR4KnjM',    // Site key for requests
        version: 2,     // Version
      }
    ],
    [
      '@nuxtjs/toast',{
        position: 'top-right',
        duration: 10000,
        keepOnHover: true,
        register: [ // Register custom toasts
          {
            name: 'my-error',
            message: 'Oops...Something went wrong',
            options: {
              type: 'error'
            }
          }
        ]
      }
    ],
    ['nuxt-lazy-load',{
      images: true,
      defaultImage: '/images/loader-img2.gif',
    }]
  ],



  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    cache: true,
    minifyJS: true,
    minifyCSS: true
  },

  apollo: {
    tokenName: "apollo-token", // optional, default: apollo-token
    cookieAttributes: {
      expires: 7, // optional, default: 7 (days)

      path: "/", // optional

      secure: false
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: "Basic", // optional, default: 'Bearer'
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      $query: {
        loadingKey: "loading",
        fetchPolicy: "cache-and-network"
      }
    },
    clientConfigs: {
      default: "~/plugins/apollo/config.js"
    }
  },

  env: {
    endpoint_url: "https://backend.readers.in/graphql",

    /*
     ** graphql
     */

    graphql: {
      headers: {
        "content-type": "application/json", // required
        Authorization: "", // Optional
        Store: "default" // required
      }
    },
    // Head Variables
    head_variables: {
      meta_description: "description",
      meta_keywords: "keywords"
    }
  },

  // I18n for language translate
  i18n: {
    locales: [
      {
        code: "en",
        file: "en-US.js"
      }
    ],
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en"
    },
    lazy: true,
    langDir: "lang/"
  },

  /* cloudinary: {
    cloudName: "www-readers-in",
    apiKey: 661169151299739,
    apiSecret: "PbjraFVJWl4BG8M6AJ0VMH1aWsU"
  }, */

  pwa: {
    manifest: {
      name: "Readers",
      short_name: "Readers",
      description: "Buy stationery items online in India",
      lang: "en",
      background_color: "#FFFFFF",
      theme_color: "#DE1F16",
      icons: [
        {
          src: "/maskable_icon.png",
          sizes: "196x196",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    },
    icon: {
      source: "/maskable_icon.png",
      fileName: "maskable_icon.png",
      sizes: [64, 120, 144, 152, 192, 384, 512],
      purpose: "maskable"
    }
  }
};

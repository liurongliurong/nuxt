module.exports = {
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo_icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rufina|Josefin+Sans:400,700|Playfair+Display:700|Prata' }
    ]
  },
  loading: {
    color: 'white',
    height: '2px'
  },
  plugins: ['~plugins/styleFrame']
}

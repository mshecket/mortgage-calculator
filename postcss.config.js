module.exports = {
    parser: 'sugarss',
    plugins: [
      require('postcss-import')({ ...options }),
      require('postcss-url')({ url: 'copy', useHash: true }),
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  }
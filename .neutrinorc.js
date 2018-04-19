module.exports = {
  use: [
    '@neutrinojs/airbnb-base',
    'neutrino-middleware-sass',
    ['@neutrinojs/style-loader', {
      loaders: [
        {
          loader: 'sass-loader',
          useId: 'sass'
        }
    ]}],
    [
      '@neutrinojs/library',
      {
        name: 'Uppload',
        target: 'web',
        libraryTarget: 'umd',
        polyfills: {
          async: true
        },
        babel: {
          presets: [
            ['babel-preset-env', {
              targets: {
                browsers: [
                  'last 5 Chrome versions',
                  'last 5 Firefox versions'
                ]
              }
            }]
          ]
        }
      }
    ]
  ]
};

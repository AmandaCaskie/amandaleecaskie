const env                     = require('dotenv').config()
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const df                      = require('dateformat')

const SpikeDatoCMS            = require('spike-datocms')
const postcssMixins           = require('postcss-mixins')
const markdownItAttrs = require('markdown-it-attrs')


const locals                  = { }

const Dato = new SpikeDatoCMS({
  addDataTo: locals,
  token: process.env.dato_api_key,
  models: [
    {
      name: 'home_page',
      template: {
        path: 'views/index.sgr',
        output: (page) => { return `/index.html` }
      }
    },
    {
      name: 'social'
    },
    {
      name: 'class',
      transform: (data) => {
        if (data.date) {
          dateHours = new Date(data.date)
          data.date = dateHours.setUTCHours(5)
        }
        return data
      }
    }
  ]
})

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.css' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'package-lock.json'],
  reshape: htmlStandards({
    parser: sugarml,
    locals: (ctx) => { return Object.assign(locals,
      { pageId: pageId(ctx) },
      { df: df.bind(df) }
    )},
    markdownPlugins: [  markdownItAttrs ]
  }),
  postcss: cssStandards({
    warnForDuplicates: env !== 'production',
    appendPlugins: postcssMixins()

  }),
  plugins: [ Dato ]
}

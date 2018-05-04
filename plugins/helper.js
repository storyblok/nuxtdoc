import crypto from 'crypto'
import marked from 'marked'

export function markdown(string, param) {
  return marked(resizeImages(string, param))
}

export function resizeImages(str, param) {
  return typeof str === 'undefined' ? '' : str.replace(/a.storyblok.com/g, 'img2.storyblok.com/' + param);
}

export function checkAndInitEditMode(app) {
  // Want to know more about this? https://www.storyblok.com/docs/Guides/storyblok-latest-js

  // Get query params added by the Storyblok Live-Preview iframe
  // Needs to be url encode, since nuxt url encodes "[" and "]"
  const space_id = app.$storyblok.getParam(encodeURI('_storyblok_tk[space_id]'))
  const timestamp = app.$storyblok.getParam(encodeURI('_storyblok_tk[timestamp]'))

  // build control token by using the local accessToken and params
  const controlString = `${space_id}:${app.$storyapi.accessToken}:${timestamp}`

  // hash it using sha1
  const controlToken = crypto.createHash('sha1').update(`${space_id}:${app.$storyapi.accessToken}:${timestamp}`).digest('hex')

  // check if the controlToken is equal to the validation token passed as param
  // and if timestamp is in the lates 60 minutes.
  if (app.$storyblok.getParam(encodeURI('_storyblok_tk[token]')) == controlToken && 
    app.$storyblok.getParam(encodeURI('_storyblok_tk[timestamp]')) > Math.floor(Date.now()/1000)-3600) { 

    // here we know it's an valid edit mode so lets initialize it and register events.
    app.$storyblok.init()
    app.$storyblok.on('change', () => {
      location.reload(true)
    })
  }
}


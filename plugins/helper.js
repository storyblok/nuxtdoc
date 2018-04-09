export function resizeImages(str, param) {
  if (typeof str === 'undefined') return ''
  return str.replace(/a.storyblok.com/g, 'img2.storyblok.com/' + param);
}

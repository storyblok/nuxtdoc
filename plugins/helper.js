export function resizeImages(str, param) {
  return str.replace(/a.storyblok.com/g, 'img2.storyblok.com/' + param);
}

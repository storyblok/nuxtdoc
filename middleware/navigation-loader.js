export default function (context) {
  return context.store.dispatch('GET_SITEMAP', context)
}
export default function (context) {
  return context.store.dispatch('GET_CACHE_VERSION', context)
}
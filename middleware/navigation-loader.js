export default function (context) {
  if (!process.server) {
    context.store.state.clippyAgent.play('Searching')
  }
  return context.store.dispatch('GET_SITEMAP', context)
}
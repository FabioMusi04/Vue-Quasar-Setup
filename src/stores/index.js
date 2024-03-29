import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()

  pinia.use((context) => {
    // console.log(context)
    const storeId = context.store.$id
    const serializer = {
      serialize: (state) => JSON.stringify(state),
      deserialize: (state) => JSON.parse(state)
    }

    const fromStorage = serializer.deserialize(window.localStorage.getItem(storeId))
    if (fromStorage) {
      context.store.$patch(fromStorage)
    }

    context.store.$subscribe((mutation, state) => {
      console.log(`mutation ${mutation.type}`)
      window.localStorage.setItem(storeId, serializer.serialize(state))
    });
  });

  return pinia
})

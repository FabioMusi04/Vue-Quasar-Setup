import router from '.'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true }},
      { path: 'products', component: () => import('pages/ProductsPage.vue') },
      { path: 'product/:id', name: 'product', component: () => import('pages/ProductPage.vue'), 
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }},
      { path: 'cart', name: "cart",  component: () => import('pages/CartPage.vue'), 
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      } },
      { path: 'favourites', name: "favourites",  component: () => import('pages/FavouritesPage.vue'),
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      } },
      { path: 'login', name: "login",  component: () => import('pages/LoginPage.vue') },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'products', component: () => import('pages/ProductsPage.vue') },
      { path: 'product/:id', name: 'product', component: () => import('pages/ProductPage.vue')},
      { path: 'cart', name: "cart",  component: () => import('pages/CartPage.vue') },
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

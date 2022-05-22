import { createRouter, createWebHistory } from 'vue-router'

/* Importa o componente "HomeView" */
import HomeView from '../views/HomeView.vue'

/* Define os nomes das rotas e componentes que fazem parte */
const routes = [
  {
    path: '/', //rota
    name: 'Home',//nome que aparece na url
    component: HomeView //componente
  },
  {
    path: '/pedidos',//rota
    name: 'Pedidos', //nome que aparece na url
    component: () => import(/* webpackChunkName: "pedidos" */ '../views/Pedidos.vue') //importa o componente "Pedidos.vue"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router



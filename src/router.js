import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index.vue'
import AddDish from './components/AddDish.vue'
import EditDish from './components/EditDish.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-dish',
      name: 'AddDish',
      component: AddDish
    },
    {
      path: '/edit-dish/:dish_type',
      name: 'EditDish',
      component: EditDish
    },
  ]
})

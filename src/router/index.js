import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue';
import ProfileUpdate from '@/components/ProfileUpdate.vue';
import LeadsGrid from '@/components/LeadsGrid.vue';
const routes = [
  { path: '/', component: Login },
  { path: '/update', component: ProfileUpdate },
  { path: '/grid', component: LeadsGrid }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
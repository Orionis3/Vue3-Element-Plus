<template>
    <el-container class="h-screen">
      <el-header class="header bg-blue-600 flex items-center">
        <el-icon class="mr-4" :size="20" @click="isCollapse = !isCollapse">
          <component :is="isCollapse ? 'Expand' : 'Fold'" />
        </el-icon>
        <span class="text-white text-xl">Vue3 Admin</span>
        <div class="flex-1 flex justify-end">
          <el-dropdown>
            <span class="text-white cursor-pointer">
              <el-avatar :size="30" class="mr-2" />
              {{ userStore.name }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-container>
        <el-aside width="200px" class="bg-white border-r">
          <el-menu 
            :default-active="$route.path"
            :collapse="isCollapse"
            router
            class="h-full">
            <template v-for="route in permissionRoutes" :key="route.path">
              <el-sub-menu v-if="route.children" :index="route.path">
                <template #title>
                  <el-icon>
                    <component :is="route.meta?.icon || 'Menu'" />
                  </el-icon>
                  <span>{{ route.meta?.title }}</span>
                </template>
                <el-menu-item 
                  v-for="child in route.children" 
                  :key="child.path" 
                  :index="child.path">
                  {{ child.meta?.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="route.path">
                <el-icon>
                  <component :is="route.meta?.icon || 'Menu'" />
                </el-icon>
                <template #title>{{ route.meta?.title }}</template>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
  
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/modules/user'
  
  const userStore = useUserStore()
  const router = useRouter()
  const isCollapse = ref(false)
  const permissionRoutes = router.getRoutes().filter(r => r.meta?.requiresAuth)
  
  const logout = () => {
    userStore.clearToken()
    router.replace('/login')
  }
  </script>
  
  <style scoped>
  .header {
    --el-header-height: 50px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
<template>
    <div class="dashboard-container">
      <!-- 数据概览卡片 -->
      <el-row :gutter="20" class="mb-8">
        <el-col :xs="24" :sm="12" :lg="6" v-for="(item,index) in statsData" :key="index">
          <el-card class="glass-card" shadow="hover">
            <div class="flex items-center">
              <div class="icon-wrapper" :style="{background: item.gradient}">
                <component :is="item.icon" class="text-2xl text-white" />
              </div>
              <div class="ml-4">
                <div class="text-gray-400 text-sm">{{ item.label }}</div>
                <div class="text-2xl font-bold mt-1">{{ item.value }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
  
      <!-- 数据可视化区域 -->
      <el-row :gutter="20">
        <el-col :span="24" :lg="16">
          <el-card class="glass-card" shadow="never">
            <template #header>
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold">访问趋势</h3>
                <el-select v-model="chartType" class="w-32">
                  <el-option label="折线图" value="line" />
                  <el-option label="柱状图" value="bar" />
                </el-select>
              </div>
            </template>
            <LineChart :key="chartType" />
          </el-card>
        </el-col>
        
        <el-col :span="24" :lg="8">
          <el-card class="glass-card h-full" shadow="never">
            <h3 class="text-lg font-semibold mb-4">热门商品</h3>
            <el-table :data="hotProducts" style="width: 100%">
              <el-table-column prop="name" label="商品名称" />
              <el-table-column label="
<template>
  <div class="gravity-container">
  
      <!-- 统计信息 -->
    <!-- <div class="stats"> -->
      <!-- <span class="total" >总数据量：{{ totalCount.toLocaleString() }} 条</span> -->
      <!-- <span class="current">当前显示：{{ visibleCount }} 条</span> -->
    <!-- </div> -->
    
    <!-- 虚拟列表 -->
    <div class="list-wrapper">
      <VirtualList 
        :listData="data" 
        :estimatedItemSize="100" 
        v-slot="slotProps"
        @update:visibleCount="handleVisibleCount"
      >
        <Item :item="slotProps.item" />
      </VirtualList>
    </div>
    
  
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import VirtualList from '../../components/virtualList/VirtualList.vue'
import Item from '../../components/virtualList/Item.vue'
import { faker } from '@faker-js/faker'

// 生成数据
const data = ref([])
for (let id = 0; id < 1000; id++) {
  data.value.push({
    id,
    value: faker.lorem.sentences()
  })
}

// 总数据量
const totalCount = computed(() => data.value.length)

// 当前显示条数
const visibleCount = ref(0)
  // 可视数据 ✅ 必须定义！
    // const visibleData = computed(() => {
    //   return data.value.slice(startIndex.value, endIndex.value);
    // });

// 接收虚拟列表传递的当前显示条数
const handleVisibleCount = (count) => {
  visibleCount.value = count
}


</script>

<style scoped>
.gravity-container {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.page-title {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 20px;
}

.page-desc {
  margin: 0 0 20px 0;
  color: #666;
}

.list-wrapper {
  flex: 1;
  min-height: 400px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.stats {
  margin-top: 15px;
  padding: 12px 20px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
}

.stats .total {
  color: #666;
  font-size: 14px;
}

.stats .current {
  color: #409eff;
  font-size: 14px;
  font-weight: 500;
}
</style>
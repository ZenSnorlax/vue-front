<template>
  <div id="operation-data">
    <el-card style="max-width: 480px">
      <p v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</p>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

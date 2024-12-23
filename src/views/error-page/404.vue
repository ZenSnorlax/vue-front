<template>
  <div class="not-found">
    <h1>404</h1>
    <p>抱歉，您访问的页面不存在。</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h1 {
  font-size: 100px;
  color: #ff6347;
}

.not-found p {
  font-size: 20px;
  color: #555;
}

.not-found a {
  font-size: 18px;
  color: #007bff;
  text-decoration: none;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>

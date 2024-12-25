<template>
  <div id="login">
    <div class="login-container">
      <div class="login-card">
        <form @submit.prevent="handleSubmit">
          <input
            v-model="username"
            class="username"
            type="text"
            placeholder="用户名"
            required
          />
          <input
            v-model="password"
            class="password"
            type="password"
            placeholder="密码"
            required
          />
          <button type="submit">登录</button>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router"; // 引入 Vue Router
import { login } from "@/api/login";

const username = ref("");
const password = ref("");
const errorMessage = ref(""); // 用于存储错误消息

const router = useRouter(); // 获取路由实例

const handleSubmit = async () => {
  const response = await login({
    username: username.value,
    password: password.value,
  });
  if (response.status == 200) {
    const token = response.data.token;

    localStorage.setItem("token", token);

    console.log("登录成功:", response.data);

    router.push("/");
  }
};
</script>

<style scoped>
.login-container {
  background-color: ghostwhite;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.login-card {
  width: 300px;
  height: auto;
  background-color: rgba(240, 235, 235, 0.5);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>

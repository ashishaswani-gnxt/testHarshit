<template>
  <div class="login-page">
    <div class="illustration">
      <div class="illustration-content">
        <img src="https://i.pinimg.com/736x/69/84/3e/69843e99dbfc7b273f8508aa23cf4f60.jpg" alt="Login illustration" class="illustration-image" />
      </div>
    </div>
    
    <div class="login-container">
      <div class="tabs">
        <div class="tab active">Login</div>
        <div class="tab">Sign up</div>
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <div class="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <input 
            v-model="email" 
            type="email" 
            id="email" 
            placeholder="Email or phone number" 
            required 
          />
        </div>
        
        <div class="input-group">
          <div class="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            placeholder="Password" 
            required 
          />
        </div>
        
        <div class="form-footer">
          <a href="#" class="forgot-password">Forgot your password?</a>
          <button type="submit" class="login-button">Login</button>
        </div>
      </form>
      
      <p v-if="loginError" class="error">{{ loginError }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import axios from 'axios'
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const loginError = ref('')
    const userStore = useUserStore()
    const router = useRouter();
    
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://smarterlead-001-site2.otempurl.com/api/admin/LoginOtp', {
          email: email.value,
          otp: null,
          password: password.value,
        })

       
        if (response.data) {
          userStore.setUserData(response.data)
          localStorage.setItem("token", response.data.token);
          loginError.value = '' // Clear any previous error
          router.push('/update');
        }
      } catch (error) {
        loginError.value = 'Invalid email or password. Please try again.'
        console.error(error)
      }
    }

    return {
      email,
      password,
      loginError,
      handleLogin,
    }
  },
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.illustration {
  flex: 1;
  background-color: #f0f9f7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 40px;
}

.illustration-content {
  position: relative;
  width: 100%;
  /* height: 100%; */
  max-width: 600px;
}

.illustration-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.login-container {
  flex: 1;
  max-width: 450px;
  padding: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.05);
}

.tabs {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #eaeaea;
}

.tab {
  padding: 10px 0;
  margin-right: 30px;
  font-size: 16px;
  color: #aaa;
  cursor: pointer;
  position: relative;
}

.tab.active {
  color: #40c4aa;
  font-weight: 500;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #40c4aa;
}

.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 1px solid #eaeaea;
  border-radius: 30px;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #40c4aa;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(64, 196, 170, 0.1);
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}

.forgot-password {
  color: #40c4aa;
  font-size: 14px;
  text-decoration: none;
}

.login-button {
  background-color: #40c4aa;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 30px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #35b399;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }
  
  .login-container {
    max-width: 100%;
    padding: 30px 20px;
    box-shadow: none;
  }
  
  .illustration {
    padding: 20px;
    min-height: 300px;
  }
}
</style>
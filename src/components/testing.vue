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

      
  
          // If login is successful, set user data in store
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

  <template>
    
  </template>
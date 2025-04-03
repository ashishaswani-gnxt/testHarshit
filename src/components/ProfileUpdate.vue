<template>
    <div class="profile-update-container">
      <div class="header">
        <h1>Profile Settings</h1>
        <p>Update your personal and company information</p>
      </div>
  
      <form @submit.prevent="updateProfile">
        <!-- User Details Section -->
        <div class="card">
          <div class="card-header">
            <h2>User Details</h2>
            <div class="avatar">
              <span>{{ getInitials(form.firstName, form.lastName) }}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name <span class="required">*</span></label>
                <input 
                  id="firstName" 
                  v-model="form.firstName" 
                  type="text" 
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input 
                  id="lastName" 
                  v-model="form.lastName" 
                  type="text"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email <span class="required">*</span></label>
                <input 
                  id="email" 
                  v-model="form.email" 
                  type="email" 
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
        </div>
  
        <!-- Company Info Section -->
        <div class="card">
          <div class="card-header">
            <h2>Company Information</h2>
          </div>
          <div class="card-body">
            <div class="form-row">
              <div class="form-group">
                <label for="company">Company <span class="required">*</span></label>
                <input 
                  id="company" 
                  v-model="form.company" 
                  type="text" 
                  required
                  placeholder="Enter company name"
                />
              </div>
              <div class="form-group">
                <label for="companyType">Company Type <span class="required">*</span></label>
                <select id="companyType" v-model="form.companyType" required>
                  <option disabled value="">Select company type</option>
                  <option v-for="(type, index) in companyTypes" :key="index" :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="address">Address <span class="required">*</span></label>
                <input 
                  id="address" 
                  v-model="form.address" 
                  type="text" 
                  required
                  placeholder="Enter your address"
                />
              </div>
              <div class="form-group">
                <label for="birthday">Birthday <span class="required">*</span></label>
                <input 
                  id="birthday" 
                  v-model="form.birthday" 
                  type="text" 
                  required
                  placeholder="Enter your birthday"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="city">City <span class="required">*</span></label>
                <input 
                  id="city" 
                  v-model="form.city" 
                  type="text" 
                  required
                  placeholder="Enter your city"
                />
              </div>
              <div class="form-group">
                <label for="state">State <span class="required">*</span></label>
                <input 
                  id="state" 
                  v-model="form.state" 
                  type="text" 
                  required
                  placeholder="Enter your state"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="zipCode">ZIP Code <span class="required">*</span></label>
                <input 
                  id="zipCode" 
                  v-model="form.zipCode" 
                  type="text" 
                  required
                  pattern="[0-9]*"
                  placeholder="Enter ZIP code"
                />
              </div>
              <div class="form-group">
                <label for="phoneNumber">Phone Number <span class="required">*</span></label>
                <input 
                  id="phoneNumber" 
                  v-model="form.phoneNumber" 
                  type="tel" 
                  required
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>
        </div>
  
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/store/user';
  
  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    companyType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    birthday: ''
  });
  
  const companyTypes = ['1', '2', '3', '4', '5'];
  
  const userStore = useUserStore();
  const router = useRouter();
  
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`;
  };
  
  const cancel = () => {
    router.push('/update'); // This is optional, it can navigate to any page you want.
  };
  
  const updateProfile = async () => {
    const requestBody = {
      clientID: 2, // Use the clientID from the store
      firstname: form.value.firstName,
      lastname: form.value.lastName,
      email: form.value.email,
      phone: form.value.phoneNumber,
      address: form.value.address,
      city: form.value.city,
      stateName: form.value.state,
      zip: form.value.zipCode,
      imagepath: 'abcd', // You can update this with an image path if applicable
      companyName: form.value.company,
      birthday: form.value.birthday, // Add the date of birth if required
      roleid: ['2'], // Assign the role ID(s) as needed
    };
    const token = localStorage.getItem("token");
    console.log("token from",token) // Get the token from the store
    try {
      const response = await axios.post(
        'http://smarterlead-001-site2.otempurl.com/api/Admin/UpdateProfile',
        requestBody,
        {
      headers: {
        'Authorization': `Bearer ${token}`,  // Pass the token in the Authorization header
        'Content-Type': 'application/json',
      },
    }
      );
  
      // Handle successful response (you can update the user store with the response if needed)
      if (response.data) {
        console.log('Profile updated successfully:', response.data);
        // Optionally, redirect to another page or show a success message
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  </script>
  
  <style scoped>
  .profile-update-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #334155;
  }
  
  .header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .header h1 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #0f766e;
    margin-bottom: 0.5rem;
  }
  
  .header p {
    color: #64748b;
    font-size: 1rem;
  }
  
  .card {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin-bottom: 2rem;
    overflow: hidden;
  }
  
  .card-header {
    padding: 1.5rem;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #0f766e;
    margin: 0;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .form-row:last-child {
    margin-bottom: 0;
  }
  
  .form-group {
    flex: 1;
    min-width: 250px;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #475569;
  }
  
  .required {
    color: #ef4444;
  }
  
  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.375rem;
    font-size: 1rem;
    color: #334155;
    background-color: white;
  }
  
  input:focus, select:focus {
    outline: 2px solid #10b981;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  
  .btn-secondary {
    background-color: #e2e8f0;
    border: 1px solid #cbd5e1;
    color: #334155;
  }
  
  .btn-primary {
    background-color: #10b981;
    border: 1px solid #10b981;
    color: white;
  }
  
  .btn:hover {
    opacity: 0.9;
  }
  </style>
  
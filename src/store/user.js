import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    email: '',
    password: '',
    userData: null,
    isAuthenticated: false,
    token: ''
  }),
  actions: {
    setUserData(data) {
      // Assuming the response data has fields that we want to store in the state.
      this.userData = {
        ...data,
        clientID: data.clientID, 
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        companyName: data.companyName,
        address: data.address,
        phone: data.phone,
        city: data.city,
        state: data.stateName,
        zip: data.zip,
        birthday: data.birthday,
        roleId: data.roleid,
      };

      this.token = data.token;
      console.log("token", this.token)
      this.isAuthenticated = true;
    },

    clearUserData() {
      this.userData = null;
      this.isAuthenticated = false;
      this.token = '';
    },

    updateUserData(updatedData) {
      if (this.userData) {
        this.userData = {
          ...this.userData,
          ...updatedData,
        };
      }
    },
  },
});

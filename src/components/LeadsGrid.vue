<template>
    <div class="leads-container">
      <h1>Leads</h1>
  
      <!-- Table to display lead details -->
      <table v-if="leads.length > 0" class="leads-table">
        <thead>
          <tr>
            <th>Lead ID</th>
            <th>Business Name</th>
            <th>USDOT Number</th>
            <th>State</th>
            <th>Years in Business</th>
            <th>Number of Trucks</th>
            <th>MVR Violations</th>
            <th>Radius of Operation</th>
            <th>Insurance Company</th>
            <th>Downloaded Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in leads" :key="lead.LeadID">
            <td>{{ lead.LeadID }}</td>
            <td>{{ lead.BuisnessName }}</td>
            <td>{{ lead.USDOTNumber }}</td>
            <td>{{ lead.HomeState }}</td>
            <td>{{ lead.YearsInBuisness }}</td>
            <td>{{ lead.NumberOfTrucks }}</td>
            <td>{{ lead.MVRViolations }}</td>
            <td>{{ lead.RadiusOfOperation }}</td>
            <td>{{ lead.CurrentInsuranceCompany }}</td>
            <td>{{ new Date(lead.DownloadedDate).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- If no leads available -->
      <p v-else>No leads available.</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useUserStore } from "@/store/user";
  
  export default {
    setup() {
      const leads = ref([]);
      const userStore = useUserStore();
  
      // Fetch lead details on component mount
      const fetchLeads = async () => {
        const token = localStorage.getItem("token"); // Retrieve token from store
        const leadId = "4+KgMDTOw+M="; // Example lead ID, should be passed dynamically
  
        try {
          const response = await axios.post(
            'http://smarterlead-001-site2.otempurl.com/api/Leads/GetDwldLeadDetails',
            { id: leadId },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            }
          );
          // Assuming response.data is an array of lead details
          leads.value = response.data;
        } catch (error) {
          console.error("Error fetching leads:", error);
        }
      };
  
      // On mount, fetch the leads
      onMounted(fetchLeads);
  
      return {
        leads
      };
    },
  };
  </script>
  
  <style scoped>
  .leads-container {
    width: 100%;
    padding: 20px;
  }
  
  .leads-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .leads-table th, .leads-table td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .leads-table th {
    background-color: #f4f4f4;
  }
  
  .leads-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>
  
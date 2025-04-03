<template>
    <div class="leads-container">
      <div class="leads-header">
        <h1>Leads</h1>
        <div class="search-container">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search leads..." 
            class="search-input"
            @input="handleSearch"
          />
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Table to display lead details -->
      <div class="table-container">
        <table v-if="filteredLeads.length > 0" class="leads-table">
          <thead>
            <tr>
              <th v-for="(value, key) in tableHeaders" :key="key">
                {{ formatHeader(key) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lead in paginatedLeads" :key="lead.LeadID">
              <td v-for="(value, key) in tableHeaders" :key="key">
                {{ formatCellValue(lead[key]) }}
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- If no leads available -->
        <div v-else class="no-leads">
          <p>No leads available.</p>
        </div>
      </div>
  
      <!-- Pagination -->
      <div v-if="filteredLeads.length > 0" class="pagination">
        <button 
          class="pagination-button" 
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </button>
        <span class="page-info">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button 
          class="pagination-button" 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from "vue";
  import axios from "axios";
  import { useUserStore } from "@/store/user";
  
  export default {
    setup() {
      const leads = ref([]);
      const userStore = useUserStore();
      const searchQuery = ref("");
      const currentPage = ref(1);
      const itemsPerPage = 10;
  
      // Get table headers from the first lead if available
      const tableHeaders = computed(() => {
        if (leads.value.length === 0) return {};
        return leads.value[0];
      });
  
      // Format header text to be more readable
      const formatHeader = (key) => {
        return key
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
          .trim();
      };
  
      // Format cell values
      const formatCellValue = (value) => {
        if (value === null || value === undefined) return '-';
        if (typeof value === 'string' && value.includes('Date')) {
          return new Date(value).toLocaleString();
        }
        return value;
      };
  
      // Computed properties
      const filteredLeads = computed(() => {
        if (!searchQuery.value) return leads.value;
        const query = searchQuery.value.toLowerCase();
        return leads.value.filter(lead => 
          Object.values(lead).some(value => 
            String(value).toLowerCase().includes(query)
          )
        );
      });
  
      const totalPages = computed(() => 
        Math.ceil(filteredLeads.value.length / itemsPerPage)
      );
  
      const paginatedLeads = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredLeads.value.slice(start, end);
      });
  
      // Methods
      const handleSearch = () => {
        currentPage.value = 1; // Reset to first page when searching
      };
  
      // Fetch lead details on component mount
      const fetchLeads = async () => {
        const token = localStorage.getItem("token");
        const leadId = "4+KgMDTOw+M=";
  
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
        leads,
        searchQuery,
        currentPage,
        totalPages,
        filteredLeads,
        paginatedLeads,
        handleSearch,
        tableHeaders,
        formatHeader,
        formatCellValue
      };
    },
  };
  </script>
  
  <style scoped>
  .leads-container {
    width: 96%;
    padding: 2%;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .leads-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .leads-header h1 {
    color: #333;
    font-size: 24px;
    margin: 0;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .search-input {
    padding: 10px 15px;
    border: 1px solid #eaeaea;
    border-radius: 30px;
    font-size: 14px;
    width: 300px;
    transition: all 0.3s ease;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #40c4aa;
    box-shadow: 0 0 0 3px rgba(64, 196, 170, 0.1);
  }
  
  .search-button {
    background-color: #40c4aa;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #35b399;
  }
  
  .table-container {
    overflow-x: auto;
    margin-bottom: 20px;
  }
  
  .leads-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 20px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .leads-table th {
    background-color: #f0f9f7;
    color: #333;
    font-weight: 600;
    padding: 15px;
    text-align: left;
    border-bottom: 2px solid #eaeaea;
  }
  
  .leads-table td {
    padding: 15px;
    border-bottom: 1px solid #eaeaea;
    color: #666;
  }
  
  .leads-table tr:hover {
    background-color: #f9f9f9;
  }
  
  .leads-table tr:last-child td {
    border-bottom: none;
  }
  
  .no-leads {
    text-align: center;
    padding: 40px;
    color: #666;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
  }
  
  .pagination-button {
    background-color: #40c4aa;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 8px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .pagination-button:hover:not(:disabled) {
    background-color: #35b399;
  }
  
  .pagination-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .page-info {
    color: #666;
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    .leads-header {
      flex-direction: column;
      gap: 15px;
    }
  
    .search-container {
      width: 100%;
    }
  
    .search-input {
      width: 100%;
    }
  
    .leads-table {
      font-size: 14px;
    }
  
    .leads-table th,
    .leads-table td {
      padding: 10px;
    }
  }
  </style>
  
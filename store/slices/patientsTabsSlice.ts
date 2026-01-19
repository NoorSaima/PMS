import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PatientData {
  PID: string;
  Name: string;
  [key: string]: any;
}

interface TabData {
  value: string;
  label: string;
  patient?: PatientData;
}

// State for patient detail sub-tabs (Profile, Payments, Claims, etc.)
interface PatientDetailTabState {
  activeSubTab: string;
  layout: 'vertical' | 'horizontal';
}

interface PatientsTabsState {
  activeTab: string;
  tabs: TabData[];
  searchQuery: string;
  // Map of patient ID to their detail tab state
  patientDetailTabs: Record<string, PatientDetailTabState>;
}

const initialState: PatientsTabsState = {
  activeTab: 'all-patients',
  tabs: [{ value: 'all-patients', label: 'All Patients' }],
  searchQuery: '',
  patientDetailTabs: {},
};

const patientsTabsSlice = createSlice({
  name: 'patientsTabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    openPatientTab: (state, action: PayloadAction<PatientData>) => {
      const patient = action.payload;
      const tabValue = patient.PID;
      
      // Check if tab already exists
      const existingTab = state.tabs.find(tab => tab.value === tabValue);
      if (!existingTab) {
        state.tabs.push({
          value: tabValue,
          label: patient.Name,
          patient: patient,
        });
      }
      state.activeTab = tabValue;
    },
    closeTab: (state, action: PayloadAction<string>) => {
      const tabValue = action.payload;
      
      // Don't close the "all-patients" tab
      if (tabValue === 'all-patients') return;
      
      // If closing the active tab, switch to the last remaining tab
      if (state.activeTab === tabValue) {
        const remainingTabs = state.tabs.filter(t => t.value !== tabValue);
        const lastTab = remainingTabs[remainingTabs.length - 1];
        state.activeTab = lastTab ? lastTab.value : 'all-patients';
      }
      
      // Remove the tab
      state.tabs = state.tabs.filter(t => t.value !== tabValue);
    },
    openNewPatientTab: (state) => {
      const newTabValue = 'new-patient';
      const existingTab = state.tabs.find(tab => tab.value === newTabValue);
      
      if (!existingTab) {
        state.tabs.push({
          value: newTabValue,
          label: 'New Patient',
        });
      }
      state.activeTab = newTabValue;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setPatientDetailTab: (state, action: PayloadAction<{ patientId: string; subTab: string }>) => {
      const { patientId, subTab } = action.payload;
      if (!state.patientDetailTabs[patientId]) {
        state.patientDetailTabs[patientId] = {
          activeSubTab: 'profile',
          layout: 'vertical',
        };
      }
      state.patientDetailTabs[patientId].activeSubTab = subTab;
    },
    setPatientDetailLayout: (state, action: PayloadAction<{ patientId: string; layout: 'vertical' | 'horizontal' }>) => {
      const { patientId, layout } = action.payload;
      if (!state.patientDetailTabs[patientId]) {
        state.patientDetailTabs[patientId] = {
          activeSubTab: 'profile',
          layout: 'vertical',
        };
      }
      state.patientDetailTabs[patientId].layout = layout;
    },
    resetPatientsTabs: (state) => {
      state.activeTab = initialState.activeTab;
      state.tabs = initialState.tabs;
      state.searchQuery = initialState.searchQuery;
      state.patientDetailTabs = initialState.patientDetailTabs;
    },
  },
});

export const {
  setActiveTab,
  openPatientTab,
  closeTab,
  openNewPatientTab,
  setSearchQuery,
  setPatientDetailTab,
  setPatientDetailLayout,
  resetPatientsTabs,
} = patientsTabsSlice.actions;

export default patientsTabsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EraData {
  id: string;
  payer: string;
  rptDate: string;
  submitter: string;
  checks: number;
  amount: number;
  payment: number;
  checkDate: string;
  checkNumber: string;
  checkAmount: number;
  payerId: string;
  npi: string;
  taxId: string;
  receivedDate: string;
  isNew: boolean;
  claims: any[];
  [key: string]: any;
}

interface TabData {
  value: string;
  label: string;
  era?: EraData;
}

interface EraTabsState {
  activeTab: string;
  tabs: TabData[];
  // Filter states
  receivedDateFilter: string;
  receivedDateFrom: string;
  receivedDateTo: string;
  checkNumberFilter: string;
  checkAmountFilter: string;
  checkDateFilter: string;
  payerIdFilter: string;
  npiFilter: string;
  taxIdFilter: string;
  eraIdFilter: string;
  newOnlyFilter: string;
}

const initialState: EraTabsState = {
  activeTab: 'all-eras',
  tabs: [{ value: 'all-eras', label: 'All ERAs' }],
  // Initialize filters
  receivedDateFilter: 'all',
  receivedDateFrom: '',
  receivedDateTo: '',
  checkNumberFilter: '',
  checkAmountFilter: '',
  checkDateFilter: '',
  payerIdFilter: '',
  npiFilter: '',
  taxIdFilter: '',
  eraIdFilter: '',
  newOnlyFilter: 'all',
};

const eraTabsSlice = createSlice({
  name: 'eraTabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    openEraTab: (state, action: PayloadAction<EraData>) => {
      const era = action.payload;
      const tabValue = era.id;
      
      // Check if tab already exists
      const existingTab = state.tabs.find(tab => tab.value === tabValue);
      if (!existingTab) {
        state.tabs.push({
          value: tabValue,
          label: `ERA ${era.id}`,
          era: era,
        });
      }
      state.activeTab = tabValue;
    },
    closeTab: (state, action: PayloadAction<string>) => {
      const tabValue = action.payload;
      
      // Don't close the "all-eras" tab
      if (tabValue === 'all-eras') return;
      
      // If closing the active tab, switch to the last remaining tab
      if (state.activeTab === tabValue) {
        const remainingTabs = state.tabs.filter(t => t.value !== tabValue);
        const lastTab = remainingTabs[remainingTabs.length - 1];
        state.activeTab = lastTab ? lastTab.value : 'all-eras';
      }
      
      // Remove the tab
      state.tabs = state.tabs.filter(t => t.value !== tabValue);
    },
    // Filter actions
    setReceivedDateFilter: (state, action: PayloadAction<string>) => {
      state.receivedDateFilter = action.payload;
    },
    setReceivedDateFrom: (state, action: PayloadAction<string>) => {
      state.receivedDateFrom = action.payload;
    },
    setReceivedDateTo: (state, action: PayloadAction<string>) => {
      state.receivedDateTo = action.payload;
    },
    setCheckNumberFilter: (state, action: PayloadAction<string>) => {
      state.checkNumberFilter = action.payload;
    },
    setCheckAmountFilter: (state, action: PayloadAction<string>) => {
      state.checkAmountFilter = action.payload;
    },
    setCheckDateFilter: (state, action: PayloadAction<string>) => {
      state.checkDateFilter = action.payload;
    },
    setPayerIdFilter: (state, action: PayloadAction<string>) => {
      state.payerIdFilter = action.payload;
    },
    setNpiFilter: (state, action: PayloadAction<string>) => {
      state.npiFilter = action.payload;
    },
    setTaxIdFilter: (state, action: PayloadAction<string>) => {
      state.taxIdFilter = action.payload;
    },
    setEraIdFilter: (state, action: PayloadAction<string>) => {
      state.eraIdFilter = action.payload;
    },
    setNewOnlyFilter: (state, action: PayloadAction<string>) => {
      state.newOnlyFilter = action.payload;
    },
    clearAllFilters: (state) => {
      state.receivedDateFilter = 'all';
      state.receivedDateFrom = '';
      state.receivedDateTo = '';
      state.checkNumberFilter = '';
      state.checkAmountFilter = '';
      state.checkDateFilter = '';
      state.payerIdFilter = '';
      state.npiFilter = '';
      state.taxIdFilter = '';
      state.eraIdFilter = '';
      state.newOnlyFilter = 'all';
    },
    resetEraTabs: (state) => {
      state.activeTab = initialState.activeTab;
      state.tabs = initialState.tabs;
      state.receivedDateFilter = initialState.receivedDateFilter;
      state.receivedDateFrom = initialState.receivedDateFrom;
      state.receivedDateTo = initialState.receivedDateTo;
      state.checkNumberFilter = initialState.checkNumberFilter;
      state.checkAmountFilter = initialState.checkAmountFilter;
      state.checkDateFilter = initialState.checkDateFilter;
      state.payerIdFilter = initialState.payerIdFilter;
      state.npiFilter = initialState.npiFilter;
      state.taxIdFilter = initialState.taxIdFilter;
      state.eraIdFilter = initialState.eraIdFilter;
      state.newOnlyFilter = initialState.newOnlyFilter;
    },
  },
});

export const {
  setActiveTab,
  openEraTab,
  closeTab,
  setReceivedDateFilter,
  setReceivedDateFrom,
  setReceivedDateTo,
  setCheckNumberFilter,
  setCheckAmountFilter,
  setCheckDateFilter,
  setPayerIdFilter,
  setNpiFilter,
  setTaxIdFilter,
  setEraIdFilter,
  setNewOnlyFilter,
  clearAllFilters,
  resetEraTabs,
} = eraTabsSlice.actions;

export default eraTabsSlice.reducer;

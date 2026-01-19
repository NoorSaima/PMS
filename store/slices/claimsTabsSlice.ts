import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ClaimType = 'professional' | 'institutional';

interface ClaimData {
  id?: string;
  name?: string;
  type?: ClaimType;
  [key: string]: any;
}

interface ClaimTab {
  value: string;
  label: string;
  type: ClaimType;
  id?: string;
  data?: ClaimData;
}

// State for claim detail sub-tabs (Claim, Charges, Ambulance, etc.)
interface ClaimDetailTabState {
  activeSubTab: string;
  layout: 'vertical' | 'horizontal';
}

interface ClaimsTabsState {
  activeTab: string;
  tabs: ClaimTab[];
  searchQuery: string;
  // Map of claim ID to their detail tab state
  claimDetailTabs: Record<string, ClaimDetailTabState>;
}

const initialState: ClaimsTabsState = {
  activeTab: 'all-claims',
  tabs: [{ value: 'all-claims', label: 'All Claims', type: 'professional' }],
  searchQuery: '',
  claimDetailTabs: {},
};

const claimsTabsSlice = createSlice({
  name: 'claimsTabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    openClaimTab: (state, action: PayloadAction<ClaimData>) => {
      const claim = action.payload;
      const tabValue = claim.id!;
      
      // Check if tab already exists
      const existingTab = state.tabs.find(tab => tab.value === tabValue);
      if (!existingTab) {
        state.tabs.push({
          value: tabValue,
          label: claim.name || 'Claim Details',
          type: (claim.type?.toLowerCase() as ClaimType) || 'professional',
          id: claim.id,
          data: claim,
        });
      }
      state.activeTab = tabValue;
    },
    closeTab: (state, action: PayloadAction<string>) => {
      const tabValue = action.payload;
      
      // Don't close the "all-claims" tab
      if (tabValue === 'all-claims') return;
      
      // If closing the active tab, switch to the last remaining tab
      if (state.activeTab === tabValue) {
        const remainingTabs = state.tabs.filter(t => t.value !== tabValue);
        const lastTab = remainingTabs[remainingTabs.length - 1];
        state.activeTab = lastTab ? lastTab.value : 'all-claims';
      }
      
      // Remove the tab and its detail state
      state.tabs = state.tabs.filter(t => t.value !== tabValue);
      delete state.claimDetailTabs[tabValue];
    },
    openNewClaimTab: (state, action: PayloadAction<ClaimType>) => {
      const type = action.payload;
      
      // Check if a new claim tab of this type already exists
      const existingTab = state.tabs.find(
        tab => tab.type === type && !tab.id && tab.value !== 'all-claims'
      );
      
      if (existingTab) {
        state.activeTab = existingTab.value;
        return;
      }
      
      const newTabValue = `new-${type}-claim-${Date.now()}`;
      state.tabs.push({
        value: newTabValue,
        label: `New ${type === 'professional' ? 'Prof.' : 'Inst.'} Claim`,
        type: type,
      });
      state.activeTab = newTabValue;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setClaimDetailTab: (state, action: PayloadAction<{ claimId: string; subTab: string }>) => {
      const { claimId, subTab } = action.payload;
      if (!state.claimDetailTabs[claimId]) {
        state.claimDetailTabs[claimId] = {
          activeSubTab: 'claim',
          layout: 'vertical',
        };
      }
      state.claimDetailTabs[claimId].activeSubTab = subTab;
    },
    setClaimDetailLayout: (state, action: PayloadAction<{ claimId: string; layout: 'vertical' | 'horizontal' }>) => {
      const { claimId, layout } = action.payload;
      if (!state.claimDetailTabs[claimId]) {
        state.claimDetailTabs[claimId] = {
          activeSubTab: 'claim',
          layout: 'vertical',
        };
      }
      state.claimDetailTabs[claimId].layout = layout;
    },
    resetClaimsTabs: (state) => {
      state.activeTab = initialState.activeTab;
      state.tabs = initialState.tabs;
      state.searchQuery = initialState.searchQuery;
      state.claimDetailTabs = initialState.claimDetailTabs;
    },
  },
});

export const {
  setActiveTab,
  openClaimTab,
  closeTab,
  openNewClaimTab,
  setSearchQuery,
  setClaimDetailTab,
  setClaimDetailLayout,
  resetClaimsTabs,
} = claimsTabsSlice.actions;

export default claimsTabsSlice.reducer;

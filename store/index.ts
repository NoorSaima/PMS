import { configureStore } from '@reduxjs/toolkit';
import patientsTabsReducer from './slices/patientsTabsSlice';
import claimsTabsReducer from './slices/claimsTabsSlice';
import eraTabsReducer from './slices/eraTabsSlice';
import practiceReducer from './slices/practiceSlice';
import claimReducer from './slices/claimSlice';
import patientInsuranceReducer from './slices/patientInsuranceSlice';
import patientAuthorizationReducer from './slices/patientAuthorizationSlice';
import appointmentReducer from './slices/appointmentSlice';

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    patientsTabs: patientsTabsReducer,
    claimsTabs: claimsTabsReducer,
    eraTabs: eraTabsReducer,
    practice: practiceReducer,
    claim: claimReducer,
    patientInsurance: patientInsuranceReducer,
    patientAuthorization: patientAuthorizationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

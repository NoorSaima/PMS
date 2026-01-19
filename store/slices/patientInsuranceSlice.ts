import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface InsurancePolicy {
    id: string;
    priority: string;
    payer: string;
    memberId: string;
    insured: string;
    relation: string;
    effectiveDate: string;
    terminationDate: string;
    eligibility: string;
    default: string;
    status: string;
}

interface PatientInsuranceState {
    policies: InsurancePolicy[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PatientInsuranceState = {
    policies: [],
    isLoading: false,
    error: null,
};

// Async thunk to fetch patient insurance list
export const fetchPatientInsuranceList = createAsyncThunk(
    'patientInsurance/fetchList',
    async (patientId: string | number, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/patients/insurances/insurance/get-patient-insurance-list?PatientId=${patientId}`);
            
            if (!res.ok) {
                throw new Error("Failed to fetch insurance");
            }

            const data = await res.json();
            console.log("Fetched Insurance Data:", data);

            // Map API response to InsurancePolicy interface
            const mappedPolicies: InsurancePolicy[] = Array.isArray(data) ? data.map((item: any) => ({
                id: item.PTInsuranceID,
                priority: item.PayerPriority,
                payer: item.PayerName,
                memberId: item.MemberID,
                insured: item.Insured,
                relation: item.RelationtoInsured,
                effectiveDate: item.EffectiveDate ? new Date(item.EffectiveDate).toLocaleDateString() : "-",
                terminationDate: item.TerminationDate ? new Date(item.TerminationDate).toLocaleDateString() : "-",
                eligibility: item.PolicyType || "Unknown",
                default: item.IsDefault === 1 ? "Yes" : "No",
                status: item.isdelete === 0 ? "Active" : "Inactive"
            })) : [];

            return mappedPolicies;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch insurance policies');
        }
    }
);

const patientInsuranceSlice = createSlice({
    name: 'patientInsurance',
    initialState,
    reducers: {
        addPolicy: (state, action: PayloadAction<InsurancePolicy>) => {
            state.policies.push(action.payload);
        },
        removePolicy: (state, action: PayloadAction<string>) => {
            state.policies = state.policies.filter(p => p.id !== action.payload);
        },
        clearPolicies: (state) => {
            state.policies = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatientInsuranceList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPatientInsuranceList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.policies = action.payload;
            })
            .addCase(fetchPatientInsuranceList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addPolicy, removePolicy, clearPolicies } = patientInsuranceSlice.actions;
export default patientInsuranceSlice.reducer;

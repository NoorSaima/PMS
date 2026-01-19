import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Authorization {
    id: string;
    type: string;
    payerName: string;
    requestedOn: string;
    status: string;
    validityPeriod: string;
    priorAuthNumber: string;
    cptCodes: string;
    icdCodes: string;
    patientId?: string | number;
}

interface AddAuthorizationPayload {
    patientId: string;
    insuranceId: string;
    refferType: string;
    startDate: string;
    endDate: string;
    authorizationNumber: string;
    visitsAuthorized: number;
    visitsRemaining: number;
    visitsUsed: number;
    showAlert: boolean;
    showAlertDaysBefore: number;
    notes: string;
    status: string;
    icdCodes: string[];
    cptCodes: string[];
}

interface EditAuthorizationPayload extends AddAuthorizationPayload {
    PriorAuthID: string;
    PatientId: string;
}

interface PatientAuthorizationState {
    authorizations: Authorization[];
    isLoading: boolean;
    error: string | null;
    isSaving: boolean;
}

const initialState: PatientAuthorizationState = {
    authorizations: [],
    isLoading: false,
    error: null,
    isSaving: false,
};

// Async thunk to fetch patient authorization list
export const fetchPatientAuthorizationList = createAsyncThunk(
    'patientAuthorization/fetchList',
    async (patientId: string | number, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/patients/get-patient-prior-auth-list?patientId=${patientId}`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch authorization list");
            }

            const result = await response.json();
            const mappedData: Authorization[] = result.map((item: any) => ({
                id: item.PriorAuthID.toString(),
                type: item.PAType,
                payerName: item.PayerName || "N/A",
                requestedOn: new Date(item.RequestedDate).toLocaleDateString(),
                status: item.Status,
                validityPeriod: item.ValidityPeriod,
                priorAuthNumber: item.PriorAuthNumber,
                cptCodes: item.CPTCodes,
                icdCodes: item.ICDCodes,
                patientId: patientId,
            }));

            return mappedData;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch authorization list');
        }
    }
);

// Async thunk to add prior authorization
export const addPriorAuthorization = createAsyncThunk(
    'patientAuthorization/add',
    async (payload: AddAuthorizationPayload, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/patients/add-prior-authorization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add prior authorization');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to add prior authorization');
        }
    }
);

// Async thunk to edit prior authorization
export const editPriorAuthorization = createAsyncThunk(
    'patientAuthorization/edit',
    async (payload: EditAuthorizationPayload, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/patients/edit-patient-prior-authorization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update prior authorization');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update prior authorization');
        }
    }
);

// Async thunk to delete prior authorization
export const deletePriorAuthorization = createAsyncThunk(
    'patientAuthorization/delete',
    async ({ priorAuthId }: { priorAuthId: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/patients/delete-patient-prior-authorization?PriorAuthID=${priorAuthId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete prior authorization');
            }

            return priorAuthId;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete prior authorization');
        }
    }
);

const patientAuthorizationSlice = createSlice({
    name: 'patientAuthorization',
    initialState,
    reducers: {
        clearAuthorizations: (state) => {
            state.authorizations = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch authorization list
            .addCase(fetchPatientAuthorizationList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPatientAuthorizationList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authorizations = action.payload;
            })
            .addCase(fetchPatientAuthorizationList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Add authorization
            .addCase(addPriorAuthorization.pending, (state) => {
                state.isSaving = true;
                state.error = null;
            })
            .addCase(addPriorAuthorization.fulfilled, (state) => {
                state.isSaving = false;
            })
            .addCase(addPriorAuthorization.rejected, (state, action) => {
                state.isSaving = false;
                state.error = action.payload as string;
            })
            // Edit authorization
            .addCase(editPriorAuthorization.pending, (state) => {
                state.isSaving = true;
                state.error = null;
            })
            .addCase(editPriorAuthorization.fulfilled, (state) => {
                state.isSaving = false;
            })
            .addCase(editPriorAuthorization.rejected, (state, action) => {
                state.isSaving = false;
                state.error = action.payload as string;
            })
            // Delete authorization
            .addCase(deletePriorAuthorization.pending, (state) => {
                state.error = null;
            })
            .addCase(deletePriorAuthorization.fulfilled, (state, action) => {
                state.authorizations = state.authorizations.filter(auth => auth.id !== action.payload);
            })
            .addCase(deletePriorAuthorization.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { clearAuthorizations } = patientAuthorizationSlice.actions;
export default patientAuthorizationSlice.reducer;

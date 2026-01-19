import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Status interfaces
export interface ClaimStatus {
    ClaimStatusID: number;
    ClaimStatus: string;
}

export interface ClaimLineStatus {
    ClaimLineStatusID: number;
    ClaimLinesStatus: string;
}

// ICD Status interfaces
export interface ICDStatusResponse {
    Message?: string;
    ID?: number;
    CompanyId?: string;
    Code?: string;
    ShortCodeDescp?: string;
    Status?: number;
    AddedBy?: string;
    AddedDate?: string;
    UpdateBy?: string | null;
    UpdateDate?: string | null;
}

export interface ICDValidationState {
    [fieldName: string]: {
        isValid: boolean;
        isValidating: boolean;
        message?: string;
        data?: ICDStatusResponse[];
    };
}

// CPT Status interfaces
export interface CPTStatusResponse {
    Message?: string;
    ID?: number;
    CompanyId?: string;
    Code?: string;
    ShortCodeDescp?: string;
    Status?: number;
    AddedBy?: string;
    AddedDate?: string;
    UpdateBy?: string | null;
    UpdateDate?: string | null;
}

export interface CPTValidationState {
    [fieldName: string]: {
        isValid: boolean;
        isValidating: boolean;
        message?: string;
        data?: CPTStatusResponse[];
    };
}

// Interface based on the actual API response data
export interface RecentClaim {
    ClaimID: string;
    ClaimId: string;
    PatientName: string;
    DOB: string;
    FacilityName: string;
    ClaimType: string;
    TotalCharge: number;
    Payments: number;
    Balance: number;
    Entered: string;
}

export interface Claim {
    ClaimID: string;
    PatientName: string;
    DOB: string;
    FacilityName: string;
    ClaimType: string;
    TotalCharge: number;
    Payments: number;
    Balance: number;
    Entered: string;
    // Add other fields as needed for full claim data
}

export interface ClaimLine {
    SeqNo: number;
    FromDate: string;
    ToDate: string;
    CPTCode: string;
    Modifier1: string | null;
    Modifier2: string | null;
    Modifier3: string | null;
    Modifier4: string | null;
    POS: string;
    TOS: string;
    Units: number;
    UnitPrice: number;
    DxPointer1: string;
    Descp: string;
    LinePaid: number;
    Status: string;
    CreatedBy: string;
    ClaimLineID?: string;
}

// Claim Detail interface based on the API response
export interface ClaimDetail {
    ClaimID: string;
    PatientID: string;
    PatientName: string;
    ProviderName: string;
    ProviderID: string;
    RenderingProviderID: string;
    RenderingProvider: string | null;
    BillingProviderID: string;
    BillingProvider: string | null;
    SupervisingProviderID: string;
    SupervisingProvider: string | null;
    FacilityID: string;
    FacilityName: string;
    PrimaryPayerID: string;
    PrimaryPayer: string;
    SecondaryPayerID: string;
    SecondaryPayer: string;
    TertiaryPayerID: string;
    TertiaryPayer: string;
    MemberID: string;
    PolicyType: string;
    AuthorizationID: string;
    VisitUsed: number;
    Frequency: string;
    TypeofBill: string | null;
    Reference: string;
    ICD_A: string | null;
    ICD_B: string | null;
    ICD_C: string | null;
    ICD_D: string | null;
    ICD_E: string | null;
    ICD_F: string | null;
    ICD_G: string | null;
    ICD_H: string | null;
    ICD_I: string | null;
    ICD_J: string | null;
    ICD_K: string | null;
    ICD_L: string | null;
    ClaimType: string;
    ClaimNumber: string;
    TotalCharge: number;
    TotalPaid: number;
    Status: string;
    BatchID: string | null;
    StatementCoverFrom: string | null;
    StatementCoverTo: string | null;
    AdmissionDate: string | null;
    AdmissionHour: string | null;
    AdmissionType: string | null;
    AdmissionSource: string | null;
    DischargeHour: string | null;
    PatientStatus: string | null;
    SubmissionDate: string | null;
    ClaimCreatedDate: string;
    ClaimCreatedBy: string;
    ClaimUpdatedDate: string | null;
    ClaimUpdatedBy: string | null;
    ClaimLineID: string;
    SeqNo: number;
    FromDate: string;
    ToDate: string;
    CPTCode: string;
    Modifier1: string | null;
    Modifier2: string | null;
    Modifier3: string | null;
    POS: string;
    TOS: string;
    Units: number;
    UnitPrice: number;
    LineChargeAmt: number;
    DxPointer1: string;
    RevCode: string | null;
    Descp: string;
    LinePaid: number;
    DrugCode: string | null;
    DrugUnits: string | null;
    Unit: string | null;
    DrugDays: string | null;
    Prescription: string | null;
    PrescriptionDate: string | null;
    PrescriptionMonth: string | null;
    PresriptionDescp: string | null;
    LineStatus: string;
    LineCreatedDate: string;
    LineCreatedBy: string;
    LineUpdatedDate: string | null;
    LineUpdatedBy: string | null;
}

export interface CreateClaimPayload {
    PatientID: string;
    ProviderID: string;
    RenderingProviderID: string;
    BillingProviderID: string;
    SupervisingProviderID: string;
    FacilityID: string;
    PrimaryPayerID: string;
    SecondaryPayerID: string;
    TertiaryPayerID: string;
    MemberID: string;
    PolicyType: string;
    AuthorizationID: string;
    VisitUsed: number;
    MemberIDSec?: string;
    PolicyTypeSec?: string;
    AuthorizationIDSec?: string;
    VisitUsedSec?: number;
    MemberIDTert?: string;
    PolicyTypeTert?: string;
    AuthorizationIDTert?: string;
    VisitUsedTert?: number;
    Frequency: string;
    Reference: string;
    ICD_A: string | null;
    ICD_B: string | null;
    ICD_C: string | null;
    ICD_D: string | null;
    ICD_E: string | null;
    ICD_F: string | null;
    ICD_G: string | null;
    ICD_H: string | null;
    ICD_I: string | null;
    ICD_J: string | null;
    ICD_K: string | null;
    ICD_L: string | null;
    ClaimType: string;
    ClaimNumber: string;
    TotalCharge: number;
    TotalPaid: number;
    Status: string;
    BatchID: string | null;
    CreatedBy: string;
    CompanyId: string;
    PracticeId: string;
    AmbTransportReason?: string;
    AmbTransportMiles?: string;
    AmbPatientWeight?: string;
    AmbRoundTripReason?: string;
    IsStricherUsed?: number;
    IsBedConfinedBefore?: number;
    IsBedConfinedAfter?: number;
    IsInShock?: number;
    IsEmergency?: number;
    IsRestraintUsed?: number;
    IsVisibleHemohaging?: number;
    IsPatientAdmitted?: number;
    PickAddress1?: string;
    PickAddress2?: string;
    PickCity?: string;
    PickState?: string;
    PickZip?: string;
    DropFacility?: string;
    DropAddress1?: string;
    DropAddress2?: string;
    DropCity?: string;
    DropState?: string;
    DropZip?: string;
    BillTo?: string;
    DOS?: string;
    DOSTO?: string;
    ClaimLines: ClaimLine[];
}

interface ClaimState {
    claims: RecentClaim[];
    recentClaims: RecentClaim[];
    claimDetail: ClaimDetail | null;
    claimStatuses: ClaimStatus[];
    claimLineStatuses: ClaimLineStatus[];
    icdValidation: ICDValidationState;
    cptValidation: CPTValidationState;
    loading: boolean;
    error: string | null;
    saving: boolean;
}

const initialState: ClaimState = {
    claims: [],
    recentClaims: [],
    claimDetail: null,
    claimStatuses: [],
    claimLineStatuses: [],
    icdValidation: {},
    cptValidation: {},
    loading: false,
    error: null,
    saving: false,
};

// Get Recent Claims
export const getRecentClaimList = createAsyncThunk(
    'claim/getRecentClaimList',
    async (params: { userId: string; practiceId: string }, thunkAPI) => {
        try {
            const res = await fetch(`/api/claims?userId=${params.userId}&practiceId=${params.practiceId}`);
            const data = await res.json();

            if (!data.success) throw new Error(data.message || 'Failed to fetch recent claims');
            return data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Get Claims List
export const getClaimList = createAsyncThunk(
    'claim/getClaimList',
    async (params: { companyId: string; name?: string; exactMatch?: string; status?: string }, thunkAPI) => {
        try {
            const searchParams = new URLSearchParams();
            searchParams.append('CompanyId', params.companyId);
            if (params.name) searchParams.append('Name', params.name);
            if (params.exactMatch) searchParams.append('ExactMatch', params.exactMatch);
            if (params.status) searchParams.append('Status', params.status);

            const res = await fetch(`/api/claims?${searchParams.toString()}`);
            const data = await res.json();

            if (!data.success) throw new Error(data.message || 'Failed to fetch claims list');
            return data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Add Recent Claim
export const addRecentClaim = createAsyncThunk(
    'claim/addRecentClaim',
    async (payload: { userId: string; claimId: string; practiceId: string; ipAddress?: string }, thunkAPI) => {
        try {
            const res = await fetch('/api/claims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!data.success) throw new Error(data.message || 'Failed to add recent claim');
            return data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Add Claim
export const addClaim = createAsyncThunk(
    'claim/addClaim',
    async (payload: CreateClaimPayload, thunkAPI) => {
        try {
            const res = await fetch('/api/claims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `HTTP error! status: ${res.status}`);
            }

            if (!data.success) {
                throw new Error(data.message || 'Failed to add claim');
            }

            return data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || 'Failed to add claim');
        }
    }
);

// Get Claim Detail
export const getClaimDetail = createAsyncThunk(
    'claim/getClaimDetail',
    async (claimId: string, thunkAPI) => {
        try {
            const res = await fetch(`/api/claims/detail?ClaimID=${claimId}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `HTTP error! status: ${res.status}`);
            }

            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch claim detail');
            }

            return data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || 'Failed to fetch claim detail');
        }
    }
);

export const editClaim = createAsyncThunk(
    'claim/editClaim',
    async (claimData: any, thunkAPI) => {
        try {
            const res = await fetch('/api/claims/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(claimData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `HTTP error! status: ${res.status}`);
            }

            if (!data.success) {
                throw new Error(data.message || 'Failed to edit claim');
            }

            return data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || 'Failed to edit claim');
        }
    }
);

// Get Claim Status List
export const getClaimStatusList = createAsyncThunk(
    'claim/getClaimStatusList',
    async (_, thunkAPI) => {
        try {
            const res = await fetch('/api/claims/status');
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `HTTP error! status: ${res.status}`);
            }

            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch claim status list');
            }

            return data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || 'Failed to fetch claim status list');
        }
    }
);

// Get Claim Line Status List
export const getClaimLineStatusList = createAsyncThunk(
    'claim/getClaimLineStatusList',
    async (_, thunkAPI) => {
        try {
            const res = await fetch('/api/claims/line-status');
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `HTTP error! status: ${res.status}`);
            }

            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch claim line status list');
            }

            return data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || 'Failed to fetch claim line status list');
        }
    }
);

// Validate ICD Code
export const validateICDCode = createAsyncThunk(
    'claim/validateICDCode',
    async (params: { companyId: string; cptCode: string; fieldName: string }, thunkAPI) => {
        try {
            const res = await fetch(`/api/icd/status?companyId=${params.companyId}&CPT=${params.cptCode}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `HTTP error! status: ${res.status}`);
            }

            // Check if it's an error response with Message field
            if (Array.isArray(data.data) && data.data.length === 1 && data.data[0].Message) {
                return {
                    fieldName: params.fieldName,
                    isValid: false,
                    message: data.data[0].Message,
                    data: data.data
                };
            }

            // Valid ICD codes response
            return {
                fieldName: params.fieldName,
                isValid: true,
                message: undefined,
                data: data.data
            };
        } catch (err: any) {
            return thunkAPI.rejectWithValue({
                fieldName: params.fieldName,
                message: err.message || 'Failed to validate ICD code'
            });
        }
    }
);

// Validate CPT Code
export const validateCPTCode = createAsyncThunk(
    'claim/validateCPTCode',
    async (params: { companyId: string; cptCode: string; fieldName: string }, thunkAPI) => {
        try {
            const res = await fetch(`/api/cpt/status?companyId=${params.companyId}&CPT=${params.cptCode}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `HTTP error! status: ${res.status}`);
            }

            // Check if it's an error response with Message field
            if (Array.isArray(data.data) && data.data.length === 1 && data.data[0].Message) {
                return {
                    fieldName: params.fieldName,
                    isValid: false,
                    message: data.data[0].Message,
                    data: data.data
                };
            }

            // Valid CPT codes response
            return {
                fieldName: params.fieldName,
                isValid: true,
                message: undefined,
                data: data.data
            };
        } catch (err: any) {
            return thunkAPI.rejectWithValue({
                fieldName: params.fieldName,
                message: err.message || 'Failed to validate CPT code'
            });
        }
    }
);

const claimSlice = createSlice({
    name: 'claim',
    initialState,
    reducers: {
        clearClaimError: (state) => {
            state.error = null;
        },
        clearClaimDetail: (state) => {
            state.claimDetail = null;
        },
        clearICDValidation: (state, action: PayloadAction<string>) => {
            delete state.icdValidation[action.payload];
        },
        setICDValidating: (state, action: PayloadAction<{ fieldName: string; isValidating: boolean }>) => {
            if (!state.icdValidation[action.payload.fieldName]) {
                state.icdValidation[action.payload.fieldName] = {
                    isValid: true,
                    isValidating: false,
                };
            }
            state.icdValidation[action.payload.fieldName].isValidating = action.payload.isValidating;
        },
        clearCPTValidation: (state, action: PayloadAction<string>) => {
            delete state.cptValidation[action.payload];
        },
        setCPTValidating: (state, action: PayloadAction<{ fieldName: string; isValidating: boolean }>) => {
            if (!state.cptValidation[action.payload.fieldName]) {
                state.cptValidation[action.payload.fieldName] = {
                    isValid: true,
                    isValidating: false,
                };
            }
            state.cptValidation[action.payload.fieldName].isValidating = action.payload.isValidating;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Recent Claims
            .addCase(getRecentClaimList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecentClaimList.fulfilled, (state, action: PayloadAction<RecentClaim[]>) => {
                state.loading = false;
                state.recentClaims = action.payload;
            })
            .addCase(getRecentClaimList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get Claims List
            .addCase(getClaimList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClaimList.fulfilled, (state, action: PayloadAction<RecentClaim[]>) => {
                state.loading = false;
                state.claims = action.payload as any; // Temporary type cast
            })
            .addCase(getClaimList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add Recent Claim
            .addCase(addRecentClaim.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(addRecentClaim.fulfilled, (state, action) => {
                state.saving = false;
                // Optionally refresh the recent claims list
            })
            .addCase(addRecentClaim.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload as string;
            })

            // Add Claim
            .addCase(addClaim.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(addClaim.fulfilled, (state, action) => {
                state.saving = false;
                // Optionally refresh the claims list
            })
            .addCase(addClaim.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload as string;
            })

            // Get Claim Detail
            .addCase(getClaimDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClaimDetail.fulfilled, (state, action: PayloadAction<ClaimDetail>) => {
                state.loading = false;
                state.claimDetail = action.payload;
            })
            .addCase(getClaimDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Edit Claim
            .addCase(editClaim.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(editClaim.fulfilled, (state, action) => {
                state.saving = false;
                // Optionally refresh the claim detail
                if (state.claimDetail) {
                    state.claimDetail = { ...state.claimDetail, ...action.payload };
                }
            })
            .addCase(editClaim.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload as string;
            })

            // Get Claim Status List
            .addCase(getClaimStatusList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClaimStatusList.fulfilled, (state, action: PayloadAction<ClaimStatus[]>) => {
                state.loading = false;
                state.claimStatuses = action.payload;
            })
            .addCase(getClaimStatusList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get Claim Line Status List
            .addCase(getClaimLineStatusList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClaimLineStatusList.fulfilled, (state, action: PayloadAction<ClaimLineStatus[]>) => {
                state.loading = false;
                state.claimLineStatuses = action.payload;
            })
            .addCase(getClaimLineStatusList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Validate ICD Code
            .addCase(validateICDCode.pending, (state, action) => {
                const fieldName = action.meta.arg.fieldName;
                if (!state.icdValidation[fieldName]) {
                    state.icdValidation[fieldName] = {
                        isValid: true,
                        isValidating: false,
                    };
                }
                state.icdValidation[fieldName].isValidating = true;
            })
            .addCase(validateICDCode.fulfilled, (state, action) => {
                const { fieldName, isValid, message, data } = action.payload;
                state.icdValidation[fieldName] = {
                    isValid,
                    isValidating: false,
                    message,
                    data,
                };
            })
            .addCase(validateICDCode.rejected, (state, action) => {
                const fieldName = (action.payload as any)?.fieldName || action.meta.arg.fieldName;
                const message = (action.payload as any)?.message || 'Validation failed';
                state.icdValidation[fieldName] = {
                    isValid: false,
                    isValidating: false,
                    message,
                };
            })

            // Validate CPT Code
            .addCase(validateCPTCode.pending, (state, action) => {
                const fieldName = action.meta.arg.fieldName;
                if (!state.cptValidation[fieldName]) {
                    state.cptValidation[fieldName] = {
                        isValid: true,
                        isValidating: false,
                    };
                }
                state.cptValidation[fieldName].isValidating = true;
            })
            .addCase(validateCPTCode.fulfilled, (state, action) => {
                const { fieldName, isValid, message, data } = action.payload;
                state.cptValidation[fieldName] = {
                    isValid,
                    isValidating: false,
                    message,
                    data,
                };
            })
            .addCase(validateCPTCode.rejected, (state, action) => {
                const fieldName = (action.payload as any)?.fieldName || action.meta.arg.fieldName;
                const message = (action.payload as any)?.message || 'Validation failed';
                state.cptValidation[fieldName] = {
                    isValid: false,
                    isValidating: false,
                    message,
                };
            });
    },
});

export const { clearClaimError, clearClaimDetail, clearICDValidation, setICDValidating, clearCPTValidation, setCPTValidating } = claimSlice.actions;
export default claimSlice.reducer;
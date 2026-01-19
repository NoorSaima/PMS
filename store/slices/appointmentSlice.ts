import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// ===== INTERFACES =====
interface Appointment {
    AppointmentID: string;
    PatientID: string;
    AppointmentDate: string;
    AppointmentTime: string;
    AppointmentLength: number;
    AppointmentType: string;
    ResourceID: string;
    FacilityID: string;
    AppointmentStatus: string;
    AllowAppointmenttoOverBook: number;
    Comment?: string;
    RepeatAppointment: number;
    RepeatDurationDays: number;
    RepeatDurationDuration: string;
    EndAfter: number;
    EndOn: string;
}

interface AppointmentStatus {
    StatusID?: string;
    id?: string;
    name?: string;
    [key: string]: any;
}

interface AppointmentType {
    TypeID?: string;
    id?: string;
    name?: string;
    [key: string]: any;
}

interface ProviderSchedule {
    ProviderScheduleID: string;
    PracticeID: string;
    FacilityID: string;
    ProviderID: string;
    SlotFrom: string;
    SlotTo: string;
    AllowScheduleWOSlot: number;
}

interface AppointmentState {
    appointments: Appointment[];
    statuses: AppointmentStatus[];
    types: AppointmentType[];
    schedules: ProviderSchedule[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AppointmentState = {
    appointments: [],
    statuses: [],
    types: [],
    schedules: [],
    status: 'idle',
    error: null,
};

// ===== ASYNC THUNKS (API Calls) =====

// 1️⃣ GET: Fetch Appointment Statuses
export const fetchAppointmentStatus = createAsyncThunk(
    'appointment/fetchStatuses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/appointment?action=status');
            const data = await response.json();
            
            if (!response.ok) {
                console.error('❌ Error fetching statuses:', data);
                throw new Error(data.message || 'Failed to fetch statuses');
            }
            
            console.log('✅ Statuses loaded:', data);
            return data.data || [];
        } catch (error: any) {
            console.error('❌ Error fetching statuses:', error);
            return rejectWithValue(error.message);
        }
    }
);

// 2️⃣ GET: Fetch Appointment Types
export const fetchAppointmentTypes = createAsyncThunk(
    'appointment/fetchTypes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/appointment?action=type');
            const data = await response.json();
            
            if (!response.ok) {
                console.error('❌ Error fetching types:', data);
                throw new Error(data.message || 'Failed to fetch types');
            }
            
            console.log('✅ Types loaded:', data);
            return data.data || [];
        } catch (error: any) {
            console.error('❌ Error fetching types:', error);
            return rejectWithValue(error.message);
        }
    }
);

// 3️⃣ GET: Fetch Appointments List (with date and resource filters)
export const fetchAppointments = createAsyncThunk(
    'appointment/fetchAppointments',
    async (
        params: {
            appointmentDate: string;
            practiceId: string;
            resourceIds?: string;
        },
        { rejectWithValue }
    ) => {
        try {
            console.log('📅 [CLIENT] Fetching appointments for date:', params.appointmentDate);
            console.log('🏥 [CLIENT] Using practice ID:', params.practiceId);
            
            // GET request with query parameters in URL
            const queryParams = new URLSearchParams({
                action: 'list',
                appointmentDate: params.appointmentDate,
                practiceId: params.practiceId,
                resourceIds: params.resourceIds || ''
            });
            
            const response = await fetch(`/api/appointment?${queryParams.toString()}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            const data = await response.json();
            console.log('📥 [CLIENT] Appointments API Response:', data);
         
            
            if (!response.ok) {
                console.error('❌ [CLIENT] API returned error:', {
                    status: response.status,
                    message: data?.message,
                    success: data?.success,
                    fullData: JSON.stringify(data, null, 2)
                });
                throw new Error(data?.message || 'Failed to fetch appointments');
            }
            
            console.log('✅ [CLIENT] Appointments loaded:', data?.data?.length || 0, 'records');
            return data.data || [];
        } catch (error: any) {
            console.error('❌ [CLIENT] Error fetching appointments:', error.message);
            return rejectWithValue(error.message);
        }
    }
);



// 4️⃣ POST: Add New Appointment
export const addAppointment = createAsyncThunk(
    'appointment/addAppointment',
    async (
        payload: {
            PatientID: string;
            AppointmentDate: string;
            AppointmentTime: string;
            AppointmentLength: number;
            AppointmentType: string;
            ResourceID: string;
            FacilityID: string;
            AppointmentStatus: string;
            AllowAppointmenttoOverBook: number;
            Comment?: string;
            RepeatAppointment: number;
            RepeatDurationDays: number;
            RepeatDurationDuration: string;
            EndAfter: number;
            EndOn: string;
            PracticeId: string;
        },
        { rejectWithValue }
    ) => {
        try {
            console.log('📤 Sending appointment data:', payload);
            const response = await fetch('/api/appointment?action=add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                console.error('❌ Add appointment failed:', data);
                throw new Error(data.message || 'Failed to add appointment');
            }
            
            console.log('✅ Appointment added:', data);
            return data.data;
        } catch (error: any) {
            console.error('❌ Error adding appointment:', error);
            return rejectWithValue(error.message);
        }
    }
);

// 5️⃣ PUT: Edit Appointment
export const editAppointment = createAsyncThunk(
    'appointment/editAppointment',
    async (
        payload: {
            AppointmentID: string;
            PatientID: string;
            AppointmentDate: string;
            AppointmentTime: string;
            AppointmentLength: number;
            AppointmentType: string;
            ResourceID: string;
            FacilityID: string;
            AppointmentStatus: string;
            AllowAppointmenttoOverBook: number;
            Comment?: string;
            RepeatAppointment: number;
            RepeatDurationDays: number;
            RepeatDurationDuration: string;
            EndAfter: number;
            EndOn: string;
            PracticeId: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch('/api/appointment?action=edit', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to edit appointment');
            }
            const data = await response.json();
            console.log('✅ Appointment edited:', data);
            return data.data;
        } catch (error: any) {
            console.error('❌ Error editing appointment:', error);
            return rejectWithValue(error.message);
        }
    }
);

// 6️⃣ PUT: Edit Appointment Status
export const editAppointmentStatus = createAsyncThunk(
    'appointment/editStatus',
    async (
        params: {
            AppointmentId: string;
            StatusId: number;
            updateBy: string;
            IpAddress: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const query = new URLSearchParams({
                action: 'edit-status',
                AppointmentId: params.AppointmentId,
                StatusId: params.StatusId.toString(),
                updateBy: params.updateBy,
                IpAddress: params.IpAddress,
            });
            const response = await fetch(`/api/appointment?${query.toString()}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to edit status');
            }
            const data = await response.json();
            console.log('✅ Status updated:', data);
            return data.data;
        } catch (error: any) {
            console.error('❌ Error editing status:', error);
            return rejectWithValue(error.message);
        }
    }
);

// 7️⃣ GET: Fetch Provider Schedule
export const fetchProviderSchedules = createAsyncThunk(
    'appointment/fetchSchedules',
    async (
        params: {
            PracticeID: string;
            FacilityID: string;
            ProviderID: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const query = new URLSearchParams({
                action: 'schedule',
                PracticeID: params.PracticeID,
                FacilityID: params.FacilityID,
                ProviderID: params.ProviderID,
            });
            const response = await fetch(`/api/appointment?${query.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch schedules');
            }
            const data = await response.json();
            console.log('✅ Schedules loaded:', data);
            return data.data || [];
        } catch (error: any) {
            console.error('❌ Error fetching schedules:', error);
            return rejectWithValue(error.message);
        }
    }
);

// 8️⃣ POST: Add Provider Schedule
export const addProviderSchedule = createAsyncThunk(
    'appointment/addSchedule',
    async (
        payload: {
            PracticeID: string;
            FacilityID: string;
            ProviderID: string;
            SlotFrom: string;
            SlotTo: string;
            AllowScheduleWOSlot: number;
            AddedBy: string;
            IpAddress: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch('/api/appointment?action=add-schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to add schedule');
            }
            const data = await response.json();
            console.log('✅ Schedule added:', data);
            return data.data;
        } catch (error: any) {
            console.error('❌ Error adding schedule:', error);
            return rejectWithValue(error.message);
        }
    }
);

// 9️⃣ PUT: Edit Provider Schedule
export const editProviderSchedule = createAsyncThunk(
    'appointment/editSchedule',
    async (
        payload: {
            ProviderScheduleID: string;
            PracticeID: string;
            FacilityID: string;
            ProviderID: string;
            SlotFrom: string;
            SlotTo: string;
            AllowScheduleWOSlot: number;
            UpdateBy: string;
            IpAddress: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch('/api/appointment?action=edit-schedule', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to edit schedule');
            }
            const data = await response.json();
            console.log('✅ Schedule edited:', data);
            return data.data;
        } catch (error: any) {
            console.error('❌ Error editing schedule:', error);
            return rejectWithValue(error.message);
        }
    }
);

// 🔟 DELETE: Delete Provider Schedule
export const deleteProviderSchedule = createAsyncThunk(
    'appointment/deleteSchedule',
    async (
        payload: {
            ProviderScheduleID: string;
            DeleteBy: string;
            IpAddress: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch('/api/appointment', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to delete schedule');
            }
            const data = await response.json();
            console.log('✅ Schedule deleted:', data);
            return payload.ProviderScheduleID;
        } catch (error: any) {
            console.error('❌ Error deleting schedule:', error);
            return rejectWithValue(error.message);
        }
    }
);

// ===== SLICE =====
const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        // Synchronous actions
        setAppointments: (state, action: PayloadAction<Appointment[]>) => {
            state.appointments = action.payload;
        },
        clearAppointments: (state) => {
            state.appointments = [];
        },
        clearError: (state) => {
            state.error = null;
        },
        clearStatus: (state) => {
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        // ===== Fetch Statuses =====
        builder
            .addCase(fetchAppointmentStatus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAppointmentStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.statuses = action.payload;
            })
            .addCase(fetchAppointmentStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // ===== Fetch Types =====
        builder
            .addCase(fetchAppointmentTypes.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAppointmentTypes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.types = action.payload;
            })
            .addCase(fetchAppointmentTypes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // ===== Fetch Appointments =====
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.appointments = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // ===== Add Appointment =====
        builder
            .addCase(addAppointment.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addAppointment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.appointments.push(action.payload);
            })
            .addCase(addAppointment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // ===== Edit Appointment =====
        builder
            .addCase(editAppointment.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editAppointment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.appointments.findIndex(
                    (apt) => apt.AppointmentID === action.payload.AppointmentID
                );
                if (index !== -1) {
                    state.appointments[index] = action.payload;
                }
            })
            .addCase(editAppointment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // ===== Edit Status =====
        builder
            .addCase(editAppointmentStatus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editAppointmentStatus.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(editAppointmentStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // ===== Fetch Schedules =====
        builder
            .addCase(fetchProviderSchedules.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProviderSchedules.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.schedules = action.payload;
            })
            .addCase(fetchProviderSchedules.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // ===== Add Schedule =====
        builder
            .addCase(addProviderSchedule.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addProviderSchedule.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.schedules.push(action.payload);
            })
            .addCase(addProviderSchedule.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // ===== Edit Schedule =====
        builder
            .addCase(editProviderSchedule.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editProviderSchedule.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.schedules.findIndex(
                    (sch) => sch.ProviderScheduleID === action.payload.ProviderScheduleID
                );
                if (index !== -1) {
                    state.schedules[index] = action.payload;
                }
            })
            .addCase(editProviderSchedule.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // ===== Delete Schedule =====
        builder
            .addCase(deleteProviderSchedule.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProviderSchedule.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.schedules = state.schedules.filter(
                    (sch) => sch.ProviderScheduleID !== action.payload
                );
            })
            .addCase(deleteProviderSchedule.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const {
    setAppointments,
    clearAppointments,
    clearError,
    clearStatus,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

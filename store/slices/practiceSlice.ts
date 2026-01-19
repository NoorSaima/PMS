import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Practice {
    PracticeID: string;
    PracticeName: string;
}

interface PracticeState {
    selectedPractice: Practice | null;
    practiceList: Practice[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PracticeState = {
    selectedPractice: null,
    practiceList: [],
    status: 'idle',
    error: null,
};

export const fetchPractices = createAsyncThunk('practice/fetchPractices', async () => {
    const response = await fetch('/api/setup/users/practice-list');
    if (!response.ok) {
        throw new Error('Failed to fetch practice list');
    }
    const data = await response.json();
    return data as Practice[];
});

const practiceSlice = createSlice({
    name: 'practice',
    initialState,
    reducers: {
        setPracticeList: (state, action: PayloadAction<Practice[]>) => {
            state.practiceList = action.payload;
        },
        setSelectedPractice: (state, action: PayloadAction<Practice | null>) => {
            state.selectedPractice = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPractices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPractices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.practiceList = action.payload;
                // Default select first practice if available and none selected
                if (action.payload.length > 0 && !state.selectedPractice) {
                    state.selectedPractice = action.payload[0];
                }
            })
            .addCase(fetchPractices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch practices';
            });
    },
});

export const { setPracticeList, setSelectedPractice } = practiceSlice.actions;

export default practiceSlice.reducer;

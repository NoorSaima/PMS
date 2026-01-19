"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CreateClaimPayload, ClaimLine } from '@/store/slices/claimSlice';

interface ClaimContextType {
    claimData: Partial<CreateClaimPayload>;
    updateField: (field: string, value: any) => void;
    setClaimData: (data: Partial<CreateClaimPayload>) => void;
    addClaimLine: (line: ClaimLine) => void;
    updateClaimLine: (index: number, line: Partial<ClaimLine>) => void;
    removeClaimLine: (index: number) => void;
    resetForm: () => void;
}

const ClaimContext = createContext<ClaimContextType | undefined>(undefined);

const initialClaimData: Partial<CreateClaimPayload> = {
    // Required Patient Info
    PatientID: '12345',

    // Required Provider Info
    ProviderID: 'PROV001',
    RenderingProviderID: 'PROV001',
    BillingProviderID: 'PROV001',
    SupervisingProviderID: 'PROV001',
    FacilityID: 'FAC001',

    // Required Insurance Info
    PrimaryPayerID: 'PAY001',
    SecondaryPayerID: '',
    TertiaryPayerID: '',
    MemberID: 'MEM123456',
    PolicyType: 'Primary',
    AuthorizationID: '',
    VisitUsed: 0,

    // Claim Info
    Frequency: '1',
    Reference: '',
    ClaimType: '1',
    ClaimNumber: '',
    DOS: new Date().toISOString().split('T')[0],
    DOSTO: new Date().toISOString().split('T')[0],
    Status: '1',
    BatchID: null,
    CreatedBy: 'system',

    // ICD Codes (all optional)
    ICD_A: 'Z00.00',
    ICD_B: null,
    ICD_C: null,
    ICD_D: null,
    ICD_E: null,
    ICD_F: null,
    ICD_G: null,
    ICD_H: null,
    ICD_I: null,
    ICD_J: null,
    ICD_K: null,
    ICD_L: null,

    // Financial
    TotalCharge: 150.00,
    TotalPaid: 0,

    // Company/Practice
    CompanyId: '74e0ec91-ce44-4766-8257-35fb44cb0f7f',
    PracticeId: '74e0ec91-ce44-4766-8257-35fb44cb0f7f',

    // Claim Lines
    ClaimLines: [
        {
            SeqNo: 1,
            FromDate: new Date().toISOString().split('T')[0],
            ToDate: new Date().toISOString().split('T')[0],
            CPTCode: '99213',
            Modifier1: null,
            Modifier2: null,
            Modifier3: null,
            Modifier4: null,
            POS: '11',
            TOS: '1',
            Units: 1,
            UnitPrice: 150.00,
            DxPointer1: '1',
            Descp: 'Office visit - Established patient',
            LinePaid: 0,
            Status: '1',
            CreatedBy: 'system',
        }
    ],
};

export const ClaimProvider: React.FC<{ children: ReactNode; initialData?: Partial<CreateClaimPayload> }> = ({
    children,
    initialData
}) => {
    const [claimData, setClaimDataState] = useState<Partial<CreateClaimPayload>>(
        initialData || initialClaimData
    );

    const updateField = (field: string, value: any) => {
        setClaimDataState(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const setClaimData = (data: Partial<CreateClaimPayload>) => {
        setClaimDataState(data);
    };

    const addClaimLine = (line: ClaimLine) => {
        setClaimDataState(prev => ({
            ...prev,
            ClaimLines: [...(prev.ClaimLines || []), line]
        }));
    };

    const updateClaimLine = (index: number, line: Partial<ClaimLine>) => {
        setClaimDataState(prev => ({
            ...prev,
            ClaimLines: (prev.ClaimLines || []).map((l, i) =>
                i === index ? { ...l, ...line } : l
            )
        }));
    };

    const removeClaimLine = (index: number) => {
        setClaimDataState(prev => ({
            ...prev,
            ClaimLines: (prev.ClaimLines || []).filter((_, i) => i !== index)
        }));
    };

    const resetForm = () => {
        setClaimDataState(initialClaimData);
    };

    return (
        <ClaimContext.Provider value={{
            claimData,
            updateField,
            setClaimData,
            addClaimLine,
            updateClaimLine,
            removeClaimLine,
            resetForm
        }}>
            {children}
        </ClaimContext.Provider>
    );
};

export const useClaimContext = () => {
    const context = useContext(ClaimContext);
    if (!context) {
        throw new Error('useClaimContext must be used within ClaimProvider');
    }
    return context;
};


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdditionalInfoTab() {
    const [statementCoversFrom, setStatementCoversFrom] = useState('');
    const [statementCoversTo, setStatementCoversTo] = useState('');
    const [admissionHour, setAdmissionHour] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');
    const [admissionType, setAdmissionType] = useState('');
    const [admissionSource, setAdmissionSource] = useState('');
    const [dischargeHour, setDischargeHour] = useState('');
    const [patientStatus, setPatientStatus] = useState('');

    return (
        <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-slate-100/50 border-b">
                <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Statement Covers Period */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Statement Covers Period</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-700">From Date</Label>
                            <Input
                                type="date"
                                value={statementCoversFrom}
                                onChange={(e) => setStatementCoversFrom(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-700">To Date</Label>
                            <Input
                                type="date"
                                value={statementCoversTo}
                                onChange={(e) => setStatementCoversTo(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Admission Information */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Admission Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-700">Admission Date</Label>
                            <Input
                                type="date"
                                value={admissionDate}
                                onChange={(e) => setAdmissionDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-700">Admission Hour</Label>
                            <Input
                                placeholder="HH:MM"
                                value={admissionHour}
                                onChange={(e) => setAdmissionHour(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-700">Admission Type</Label>
                            <Select value={admissionType} onValueChange={setAdmissionType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 - Emergency</SelectItem>
                                    <SelectItem value="2">2 - Urgent</SelectItem>
                                    <SelectItem value="3">3 - Elective</SelectItem>
                                    <SelectItem value="4">4 - Newborn</SelectItem>
                                    <SelectItem value="5">5 - Trauma Center</SelectItem>
                                    <SelectItem value="9">9 - Information Not Available</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-700">Admission Source</Label>
                            <Select value={admissionSource} onValueChange={setAdmissionSource}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select source" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 - Physician Referral</SelectItem>
                                    <SelectItem value="2">2 - Clinic Referral</SelectItem>
                                    <SelectItem value="4">4 - Transfer from a Hospital</SelectItem>
                                    <SelectItem value="5">5 - Transfer from a SNF</SelectItem>
                                    <SelectItem value="7">7 - Emergency Room</SelectItem>
                                    <SelectItem value="D">D - Transfer from Hospital Inpatient</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Discharge & Status Information */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Discharge & Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-700">Discharge Hour</Label>
                            <Input
                                placeholder="HH:MM"
                                value={dischargeHour}
                                onChange={(e) => setDischargeHour(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-700">Patient Status</Label>
                            <Select value={patientStatus} onValueChange={setPatientStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="01">01 - Discharged to Home or Self Care</SelectItem>
                                    <SelectItem value="02">02 - Discharged/Transferred to Short Term General Hospital</SelectItem>
                                    <SelectItem value="03">03 - Discharged/Transferred to SNF</SelectItem>
                                    <SelectItem value="04">04 - Discharged/Transferred to ICF</SelectItem>
                                    <SelectItem value="06">06 - Discharged/Transferred to Home with Home Health Service</SelectItem>
                                    <SelectItem value="20">20 - Expired</SelectItem>
                                    <SelectItem value="30">30 - Still Patient</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

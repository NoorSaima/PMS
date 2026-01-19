'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPracticeList, setSelectedPractice, fetchPractices } from '@/store/slices/practiceSlice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PracticeSelector = () => {
    const dispatch = useAppDispatch();
    const { practiceList, selectedPractice, status } = useAppSelector((state) => state.practice);
    const isLoading = status === 'loading';

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPractices());
        }
    }, [dispatch, status]);


    const handlePracticeChange = (value: string) => {
        const practice = practiceList.find(p => p.PracticeID === value);
        if (practice) {
            dispatch(setSelectedPractice(practice));
            toast.success(`Active practice set to ${practice.PracticeName}`);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Practice Settings</CardTitle>
                <CardDescription>
                    Select the practice you want to work with.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="practice-select">Active Practice</Label>
                    {isLoading ? (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Loading practices...</span>
                        </div>
                    ) : (
                        <Select
                            value={selectedPractice?.PracticeID || ''}
                            onValueChange={handlePracticeChange}
                            disabled={isLoading}
                        >
                            <SelectTrigger id="practice-select" className="w-full md:w-[300px]">
                                <SelectValue placeholder="Select a practice" />
                            </SelectTrigger>
                            <SelectContent>

                                {practiceList.map((practice) => {
                                    return <SelectItem key={practice.PracticeID} value={practice.PracticeID}>
                                        {practice.PracticeName}
                                    </SelectItem>
                                })}
                            </SelectContent>
                        </Select>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default PracticeSelector;

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const GeneralInfo = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-1">
            <div className="md:col-span-3 space-y-2">
                <Label className="text-slate-700">Reference #</Label>
                <Input placeholder="Enter Ref #" />
            </div>

            <div className="md:col-span-3 space-y-2">
                <Label className="text-slate-700">Frequency</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Original (1)</SelectItem>
                        <SelectItem value="7">Replacement (7)</SelectItem>
                        <SelectItem value="8">Void (8)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="md:col-span-6 space-y-2">
                <Label className="text-slate-700">Patient</Label>
                <div className="flex gap-2">
                    <Input placeholder="Search Patient..." className="flex-1" />
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

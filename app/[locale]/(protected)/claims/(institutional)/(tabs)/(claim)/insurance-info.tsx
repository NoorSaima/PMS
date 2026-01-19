import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsuranceCardProps {
    level: 'Primary' | 'Secondary' | 'Tertiary';
    color: string;
}

const InsuranceCard = ({ level, color }: InsuranceCardProps) => {
    const isPrimary = level === 'Primary';

    return (
        <Card className={cn("border shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md",
            isPrimary ? "border-l-4 border-l-primary" : "border-l-4",
            level === 'Secondary' && "border-l-blue-500",
            level === 'Tertiary' && "border-l-teal-500"
        )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <ShieldCheck className={cn("w-5 h-5",
                        isPrimary ? "text-primary" :
                            level === 'Secondary' ? "text-blue-500" : "text-teal-500"
                    )} />
                    <CardTitle className="text-base font-semibold text-slate-800">
                        {level} Insurance
                    </CardTitle>
                    {isPrimary && <Badge className="bg-slate-100 text-slate-900 hover:bg-slate-200 text-xs font-normal border-0">Required</Badge>}
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor={`no-${level.toLowerCase()}`} className="text-sm font-medium text-slate-600 cursor-pointer select-none">
                        No {level}
                    </label>
                    <Switch id={`no-${level.toLowerCase()}`} />
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="rounded-lg border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center space-y-3 hover:bg-slate-50 transition-colors">
                    <div className="p-3 rounded-full bg-slate-100">
                        <Plus className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium text-slate-900">Add {level} Insurance</h4>
                        <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">
                            Click to link an existing insurance policy or create a new one for this patient.
                        </p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                        Select Insurance
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export const InsuranceInfo = () => {
    return (
        <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between bg-slate-100/50 p-4 -mx-6 border-y">
                <h3 className="text-lg font-semibold text-slate-900">
                    Insurance Coverage
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white px-3 py-1 rounded-full border shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>eligibility check recommended</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InsuranceCard level="Primary" color="primary" />
                <InsuranceCard level="Secondary" color="blue" />
                <InsuranceCard level="Tertiary" color="teal" />
            </div>
        </div>
    );
};

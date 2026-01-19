"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AuthorizationList from "./authorization-list";
import AddAuthorizationDialog from "./add-authorization-dialog";

interface AuthorizationManagerProps {
    patientId?: string | number;
}

export default function AuthorizationManager({ patientId }: AuthorizationManagerProps) {
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="px-0 pt-0 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Prior Authorizations</CardTitle>
                        <CardDescription>Manage insurance prior authorization requests and status.</CardDescription>
                    </div>
                    <AddAuthorizationDialog patientId={patientId} />
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <AuthorizationList patientId={patientId} />
            </CardContent>
        </Card>
    );
}

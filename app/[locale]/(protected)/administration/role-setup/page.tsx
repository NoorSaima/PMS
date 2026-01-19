"use client";
import React, { useState } from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, X, Shield, LayoutGrid, Pencil } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import RoleForm, { RoleFormValues } from './role-form';

type TabData = {
    value: string;
    label: string;
    roleData?: RoleFormValues;
};

const RoleSetupPage = () => {
    const [activeTab, setActiveTab] = useState("all-roles");
    const [tabs, setTabs] = useState<TabData[]>([
        { value: "all-roles", label: "All Roles" }
    ]);
    const [config] = useConfig();

    const handleCreateRole = () => {
        const newTabValue = "create-role";
        setTabs(prev => {
            if (prev.find(tab => tab.value === newTabValue)) {
                return prev;
            }
            return [...prev, { value: newTabValue, label: "Create Role" }];
        });
        setActiveTab(newTabValue);
    };

    // Mock data handling for edit
    const handleEditRole = (role: { id: number, name: string }) => {
        const tabValue = `edit-role-${role.id}`;

        // Mocking transformation from role object to form values
        const roleData: RoleFormValues = {
            roleName: role.name,
            practice: "practice-a", // Mock value
            permissions: ["user-management"], // Mock value
        };

        setTabs(prev => {
            if (prev.find(tab => tab.value === tabValue)) {
                return prev;
            }
            return [...prev, { value: tabValue, label: `Edit ${role.name}`, roleData: roleData }];
        });
        setActiveTab(tabValue);
    };

    const handleCloseTab = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        e.preventDefault();

        if (activeTab === value) {
            const remainingTabs = tabs.filter(t => t.value !== value);
            const lastTab = remainingTabs[remainingTabs.length - 1];
            setActiveTab(lastTab ? lastTab.value : "all-roles");
        }

        setTabs(prev => prev.filter(t => t.value !== value));
    };

    return (
        <div className="min-h-screen space-y-6">
            <SiteBreadcrumb />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-2 mt-4">
                {/* Custom Creative Header Section */}
                <div className="sticky top-0 z-10  backdrop-blur  py-2 -mx-4 px-4 transition-all duration-200">
                    <div className="flex bg-white flex-col md:flex-row items-center justify-between gap-4 rounded-lg p-2 border">

                        {/* Animated Tabs List */}
                        <div className="relative flex items-center flex-1 overflow-x-auto no-scrollbar mask-gradient-r">
                            <TabsList className="bg-transparent h-auto p-0 gap-2">
                                {tabs.map(tab => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={cn(
                                            "relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300",
                                            "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                                            "hover:bg-muted/50 bg-slate-100 data-[state=active]:text-primary-foreground"
                                        )}
                                    >
                                        {activeTab === tab.value && (
                                            <motion.div
                                                layoutId="active-tab-pill"
                                                className={cn(
                                                    "absolute inset-0 rounded-lg",
                                                    config.headerColor === "light" ? "bg-primary" : `theme-${config.headerColor} bg-header`
                                                )}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        <span className="relative z-10 flex items-center gap-2 font-medium">
                                            {tab.value === "all-roles" ? (
                                                <LayoutGrid className="w-4 h-4" />
                                            ) : tab.value === "create-role" ? (
                                                <Shield className="w-4 h-4" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full bg-background/20 flex items-center justify-center text-[10px]">
                                                    {tab.label.charAt(0)}
                                                </div>
                                            )}
                                            {tab.label}
                                        </span>

                                        {tab.value !== "all-roles" && (
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                className="relative z-10 ml-1 rounded-full p-0.5 hover:bg-background/20 transition-colors cursor-pointer"
                                                onMouseDown={(e) => handleCloseTab(e, tab.value)}
                                            >
                                                <X className="w-3 h-3" />
                                            </motion.span>
                                        )}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {/* Actions Group */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {activeTab === "all-roles" && (
                                <Button
                                    onClick={handleCreateRole}
                                    className="rounded-lg duration-300 gap-2 pl-3"
                                    size='md'
                                    color='success'
                                >
                                    <div className="bg-white/20 p-1 rounded-lg">
                                        <Plus className="h-3 w-3" />
                                    </div>
                                    <span className="hidden sm:inline">Create Role</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative bg-white rounded-lg min-h-[500px]">
                    <TabsContent value="all-roles" className="mt-0 outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <Card className="border-0 shadow-none bg-transparent">
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Role Name</TableHead>
                                                <TableHead>Description</TableHead>
                                                <TableHead>Users</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Administrator</TableCell>
                                                <TableCell>Full system access</TableCell>
                                                <TableCell>2</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditRole({ id: 1, name: "Administrator" })}
                                                    >
                                                        <Pencil className="w-3 h-3" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Provider</TableCell>
                                                <TableCell>Access to patient and clinical data</TableCell>
                                                <TableCell>15</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditRole({ id: 2, name: "Provider" })}
                                                    >
                                                        <Pencil className="w-3 h-3" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Biller</TableCell>
                                                <TableCell>Access to claims and payments</TableCell>
                                                <TableCell>5</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditRole({ id: 3, name: "Biller" })}
                                                    >
                                                        <Pencil className="w-3 h-3" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {tabs.map(tab => {
                        if (tab.value === "all-roles") return null;
                        return (
                            <TabsContent key={tab.value} value={tab.value} className="mt-0 outline-none">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <RoleForm
                                        initialData={tab.roleData}
                                        onCancel={(e) => handleCloseTab(e as any, tab.value)}
                                    />
                                </motion.div>
                            </TabsContent>
                        );
                    })}
                </div>
            </Tabs>
        </div>
    );
};
export default RoleSetupPage;

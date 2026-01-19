"use client";
import React, { useState } from 'react';
import SiteBreadcrumb from '@/components/site-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, X, Search, User, LayoutGrid, Pencil } from 'lucide-react'; // Added Pencil icon
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import UserForm, { UserFormValues } from './user-form'; // Updated import
import UserStats from '@/components/administration/user-management/user-stats';

type TabData = {
    value: string;
    label: string;
    userData?: UserFormValues; // Added userData to store initial data for edit
};

const UserManagementPage = () => {
    const [activeTab, setActiveTab] = useState("all-users");
    const [tabs, setTabs] = useState<TabData[]>([
        { value: "all-users", label: "All Users" }
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [config] = useConfig();

    const handleAddUser = () => {
        const newTabValue = "add-user";
        setTabs(prev => {
            if (prev.find(tab => tab.value === newTabValue)) {
                return prev;
            }
            return [...prev, { value: newTabValue, label: "Add User" }];
        });
        setActiveTab(newTabValue);
    };

    // Mock data handling for edit
    const handleEditUser = (user: any) => {
        // Create a unique tab value/id for the user
        const tabValue = `edit-user-${user.id}`; // Simple unique ID strategy

        // Map user data to form values (mocking the transformation)
        const formData: UserFormValues = {
            role: user.role,
            firstName: user.name.split(' ')[0],
            lastName: user.name.split(' ')[1] || '',
            email: user.email,
            password: "", // Don't prefill password
            twoFactorEnabled: true, // Mock value
            userType: "type1", // Mock value
            practiceList: "Practice A", // Mock value
            provider: "Provider X", // Mock value
        };

        setTabs(prev => {
            // Check if tab already exists
            const existingTab = prev.find(tab => tab.value === tabValue);
            if (existingTab) {
                return prev;
            }
            return [...prev, { value: tabValue, label: `Edit ${user.name}`, userData: formData }];
        });
        setActiveTab(tabValue);
    };


    const handleCloseTab = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        e.preventDefault();

        if (activeTab === value) {
            const remainingTabs = tabs.filter(t => t.value !== value);
            const lastTab = remainingTabs[remainingTabs.length - 1];
            setActiveTab(lastTab ? lastTab.value : "all-users");
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
                                            {tab.value === "all-users" ? (
                                                <LayoutGrid className="w-4 h-4" />
                                            ) : tab.value === "add-user" ? (
                                                <User className="w-4 h-4" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full bg-background/20 flex items-center justify-center text-[10px]">
                                                    {tab.label.charAt(0)}
                                                </div>
                                            )}
                                            {tab.label}
                                        </span>

                                        {tab.value !== "all-users" && (
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

                        {/* Search & Actions Group */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {/* Animated Search Bar in Pill Container */}
                            {activeTab === "all-users" && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    className={cn(
                                        "relative flex-1 md:w-[300px] group transition-all duration-300",
                                        isSearchFocused ? "md:w-[400px]" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "relative flex items-center overflow-hidden rounded-lg border bg-background transition-all duration-300",
                                        isSearchFocused ? "ring-2 ring-primary/20 border-primary" : "hover:border-primary/50"
                                    )}>
                                        <Search className={cn(
                                            "ml-3 h-4 w-4 transition-colors",
                                            isSearchFocused ? "text-primary" : "text-muted-foreground"
                                        )} />
                                        <input
                                            type="text"
                                            placeholder="Search users..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onFocus={() => setIsSearchFocused(true)}
                                            onBlur={() => setIsSearchFocused(false)}
                                            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/70"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "all-users" && (
                                <Button
                                    onClick={handleAddUser}
                                    className="rounded-lg duration-300 gap-2 pl-3"
                                    size='md'
                                    color='success'
                                >
                                    <div className="bg-white/20 p-1 rounded-lg">
                                        <Plus className="h-3 w-3" />
                                    </div>
                                    <span className="hidden sm:inline">Add User</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative bg-white rounded-lg min-h-[500px]">
                    <TabsContent value="all-users" className="mt-0 outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <UserStats />
                            <Card className="border-0 shadow-none bg-transparent">
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>User</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {/* Mock Data for Demonstration */}
                                            <TableRow>
                                                <TableCell className="font-medium flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>AD</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p>Admin User</p>
                                                        <p className="text-xs text-muted-foreground">admin@example.com</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>Administrator</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                        Active
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditUser({ id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Administrator' })}
                                                    >
                                                        <Pencil className="w-3 h-3 mr-1" /> Edit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>JD</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p>John Doe</p>
                                                        <p className="text-xs text-muted-foreground">john@example.com</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>Provider</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                        Active
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditUser({ id: 2, name: 'John Doe', email: 'john@example.com', role: 'Provider' })}
                                                    >
                                                        <Pencil className="w-3 h-3 mr-1" /> Edit
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
                        if (tab.value === "all-users") return null;
                        return (
                            <TabsContent key={tab.value} value={tab.value} className="mt-0 outline-none">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Render UserForm for both Add and Edit, passing initialData if it exists */}
                                    <UserForm
                                        initialData={tab.userData}
                                        onCancel={(e) => handleCloseTab(e as any, tab.value)} // Cast e to any for simplicity in this context or adjust handleCloseTab signiture to accept optional event
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
export default UserManagementPage;

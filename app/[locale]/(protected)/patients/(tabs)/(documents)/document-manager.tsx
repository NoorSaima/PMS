"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DocumentList from "./document-list";
import AddDocumentDialog from "./add-document-dialog";

interface DocumentManagerProps {
    patientId?: number | string;
}

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentManagerProps {
    patientId?: number | string;
}

export default function DocumentManager({ patientId }: DocumentManagerProps) {
    const [documentTypes, setDocumentTypes] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [editingDocument, setEditingDocument] = useState<any | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Fetch document types
    useEffect(() => {
        const fetchDocumentTypes = async () => {
            try {
                const res = await fetch("/api/patients/document-types");
                const data = await res.json();
                if (data.success) {
                    setDocumentTypes(data.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch document types", error);
            }
        };
        fetchDocumentTypes();
    }, []);

    // Fetch documents based on active tab
    const fetchDocuments = async () => {
        if (!patientId) return;
        setIsLoading(true);
        try {
            let fetchedDocs: any[] = [];

            if (activeTab === "all") {
                // If "all" and we have document types, fetch for each type
                if (documentTypes.length > 0) {
                    const promises = documentTypes.map(type =>
                        fetch(`/api/patients/document-list?patientId=${patientId}&documentType=${type.DocumentID}`)
                            .then(res => res.json())
                            .then(data => data.success ? data.data : [])
                    );

                    const results = await Promise.all(promises);
                    fetchedDocs = results.flat();
                }
            } else {
                // Fetch single type
                const res = await fetch(`/api/patients/document-list?patientId=${patientId}&documentType=${activeTab}`);
                const data = await res.json();
                if (data.success) {
                    fetchedDocs = data.data || [];
                }
            }

            // Remove duplicates if any (though unlikely with distinct types)
            const uniqueDocs = Array.from(new Map(fetchedDocs.map(item => [item['DocumentId'], item])).values());
            setDocuments(uniqueDocs);

        } catch (error) {
            console.error("Failed to fetch documents", error);
            setDocuments([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch documents based on active tab
    useEffect(() => {
        fetchDocuments();
    }, [patientId, activeTab, documentTypes]);

    const refreshDocuments = () => {
        fetchDocuments();
    };

    const handleEdit = (document: any) => {
        setEditingDocument(document);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingDocument(null);
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="px-0 pt-0 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Patient Documents</CardTitle>
                        <CardDescription>Manage and view patient medical records and files.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => { setEditingDocument(null); setIsDialogOpen(true); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Document
                        </Button>
                        <AddDocumentDialog
                            patientId={patientId}
                            onSuccess={refreshDocuments}
                            editDocument={editingDocument}
                            open={isDialogOpen}
                            onOpenChange={(open) => {
                                setIsDialogOpen(open);
                                if (!open) setEditingDocument(null);
                            }}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-transparent border-b rounded-none mb-4">
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2"
                        >
                            All Documents
                        </TabsTrigger>
                        {documentTypes.map((type) => (
                            <TabsTrigger
                                key={type.DocumentID}
                                value={type.DocumentID.toString()}
                                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2"
                            >
                                {type.DocumentType}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="mt-4">
                        <DocumentList
                            documents={documents}
                            isLoading={isLoading}
                            onRefresh={refreshDocuments}
                            onEdit={handleEdit}
                        />
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}

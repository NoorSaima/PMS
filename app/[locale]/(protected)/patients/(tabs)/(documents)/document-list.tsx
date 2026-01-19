"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpDown, Loader2 } from "lucide-react";
import DocumentCard, { Document } from "./document-card";

interface DocumentListProps {
    documents: any[]; // Using any[] for now as the API response shape might differ slightly from the mock
    isLoading: boolean;
    onRefresh: () => void;
    onEdit?: (document: any) => void;
}

export default function DocumentList({ documents, isLoading, onRefresh, onEdit }: DocumentListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredDocuments = documents.filter((doc) =>
        (doc.DocumentName || doc.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Filters Bar */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search documents..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <ArrowUpDown className="mr-2 h-4 w-4" /> Sort
                    </Button>
                </div>
            </div>

            {/* Grid */}
            {filteredDocuments.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredDocuments.map((doc) => (
                        // Mapping API response to DocumentCard props if needed
                        <DocumentCard
                            key={doc.DocumentId || doc.id}
                            document={{
                                id: doc.DocumentId || doc.id,
                                title: doc.DocumentName || doc.title,
                                type: (doc.DocumentName?.split('.').pop() || doc.type || 'pdf').toLowerCase(),
                                size: doc.size || 'Unknown', // API doesn't seem to return size, default to Unknown
                                date: doc.AddedDate || doc.date || new Date().toISOString(),
                                category: doc.DocumentType || doc.category || 'General',
                                documentTypeId: doc.DocumentTypeID || doc.documentTypeId,
                                uploadedBy: doc.AddedBy || doc.uploadedBy || 'Unknown',
                                url: doc.DocumentPath || doc.url
                            }}
                            onRefresh={onRefresh}
                            onEdit={onEdit}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg border-muted">
                    <div className="p-4 rounded-full bg-muted/50 mb-3">
                        <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No documents found</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                        Try adjusting your search terms or filters.
                    </p>
                </div>
            )}
        </div>
    );
}

"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, FileText, Image as ImageIcon, Download, Eye, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Document {
    id: string;
    title: string;
    type: "pdf" | "image" | "doc" | "other";
    size: string;
    date: string;
    category: string;
    documentTypeId?: string;
    uploadedBy: string;
    url?: string;
}

interface DocumentCardProps {
    document: Document;
    onRefresh?: () => void;
    onEdit?: (document: Document) => void;
}

export default function DocumentCard({ document, onRefresh, onEdit }: DocumentCardProps) {
    const getIcon = () => {
        switch (document.type) {
            case "pdf":
                return <FileText className="h-8 w-8 text-red-500" />;
            case "image":
                return <ImageIcon className="h-8 w-8 text-blue-500" />;
            case "doc":
                return <FileText className="h-8 w-8 text-blue-700" />;
            default:
                return <FileText className="h-8 w-8 text-gray-500" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'lab': return "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400";
            case 'insurance': return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400";
            case 'prescription': return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";
            default: return "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400";
        }
    }

    const handlePreview = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (document.id) {
            window.open(`/api/patients/view-document?documentId=${document.id}`, '_blank');
        }
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (document.id) {
            // Trigger download by setting download=true query param
            window.open(`/api/patients/view-document?documentId=${document.id}&download=true`, '_blank');
        }
    };
    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to delete this document?")) return;

        try {
            const res = await fetch("/api/patients/delete-document", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ documentId: document.id }),
            });

            const data = await res.json();

            if (data.success) {
                if (onRefresh) onRefresh();
            } else {
                alert("Failed to delete document: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting the document.");
        }
    };

    return (
        <Card className="group relative overflow-hidden transition-all hover:shadow-md border-muted">

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handlePreview}>
                            <Eye className="mr-2 h-4 w-4" /> Preview
                        </DropdownMenuItem>
                        {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(document)}>
                                <FileText className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <CardContent className="p-4 flex flex-col items-center text-center pt-8 pb-4 cursor-pointer">
                <div className="mb-4 p-3 rounded-xl bg-muted/50 transition-transform group-hover:scale-110 duration-200">
                    {getIcon()}
                </div>
                <h3 className="font-semibold text-sm truncate w-full mb-1" title={document.title}>
                    {document.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{document.size} • {document.date}</p>
                <Badge color="secondary" className={cn("text-[10px] h-5 px-2 font-medium border-0", getCategoryColor(document.category))}>
                    {document.category}
                </Badge>
            </CardContent>
            <CardFooter className="p-0 border-t bg-muted/30">
                <div className="w-full grid grid-cols-2 divide-x border-t-0">
                    <Button variant="ghost" className="h-9 rounded-none text-xs hover:bg-background hover:text-primary" onClick={handlePreview}>
                        Preview
                    </Button>
                    <Button variant="ghost" className="h-9 rounded-none text-xs hover:bg-background hover:text-primary" onClick={handleDownload}>
                        Download
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

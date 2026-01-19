"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Upload, Plus, FileUp, Loader2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface AddDocumentDialogProps {
    patientId?: number | string;
    onSuccess?: () => void;
    editDocument?: any;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function AddDocumentDialog({ patientId, onSuccess, editDocument, open, onOpenChange }: AddDocumentDialogProps) {
    // Internal state if open/onOpenChange are not controlled
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const setIsOpen = (newOpen: boolean) => {
        if (onOpenChange) onOpenChange(newOpen);
        if (!isControlled) setInternalOpen(newOpen);
    };

    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [documentTypes, setDocumentTypes] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const selectedPractice = useAppSelector((state) => state.practice.selectedPractice);

    // Reset or pre-fill form when dialog opens/closes or editDocument changes
    useEffect(() => {
        if (isOpen) {
            if (editDocument) {
                setCategory(editDocument.documentTypeId?.toString() || "");
                setTitle(editDocument.title || "");
                setDescription(editDocument.description || ""); // Assuming description exists in doc object
                // File cannot be pre-filled securely in input type="file"
                setFile(null);
            } else {
                setFile(null);
                setCategory("");
                setTitle("");
                setDescription("");
            }
            setError(null); // Clear error on open
        } else {
            // Reset form when closed
            setFile(null);
            setTitle("");
            setCategory("");
            setDescription("");
            setError(null);
        }
    }, [isOpen, editDocument]);

    useEffect(() => {
        if (isOpen) {
            const fetchDocumentTypes = async () => {
                try {
                    const res = await fetch("/api/patients/document-types");
                    const data = await res.json();
                    if (data.success) {
                        setDocumentTypes(data.data);
                    }
                } catch (error) {
                    console.error("Failed to fetch document types", error);
                }
            };
            fetchDocumentTypes();
        }
    }, [isOpen]);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile: File) => {
        setFile(selectedFile);
        if (!title) {
            setTitle(selectedFile.name.split('.')[0]);
        }
    };

    const handleUpload = async () => {
        const practiceId = selectedPractice?.PracticeID;

        console.log("Upload Debug:", {
            file: file,
            category,
            practiceId: practiceId,
            patientId: patientId
        });

        if (!patientId || !practiceId || !category) {
            setError("Missing required fields: Patient, Practice, or Category");
            return;
        }

        if (!editDocument && !file) {
            setError("Please select a file.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        if (file) {
            formData.append("file", file);
        }
        formData.append("documentType", category);
        formData.append("practiceId", practiceId.toString());
        formData.append("patientUID", patientId.toString());

        if (title) formData.append("title", title);
        if (description) formData.append("description", description);

        const url = editDocument ? "/api/patients/edit-document" : "/api/patients/add-document";

        if (editDocument) {
            formData.append("documentId", editDocument.id);
        }

        try {
            const res = await fetch(url, {
                method: editDocument ? "PUT" : "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Upload failed");
            }

            if (onSuccess) onSuccess();
            setIsOpen(false);
            setFile(null);
            setCategory("");
            setTitle("");
            setDescription("");
        } catch (err: any) {
            console.error("Upload error:", err);
            setError(err.message || "Failed to upload document");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {!isControlled && (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Upload Document
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{editDocument ? "Edit Document" : "Upload Document"}</DialogTitle>
                    <DialogDescription>
                        {editDocument ? "Update document details or replace the file." : "Upload a new document to the patient's record."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* File Upload Zone */}
                    <div
                        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragActive
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-primary/50"
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-4 rounded-full bg-primary/10 text-primary">
                                <FileUp className="h-6 w-6" />
                            </div>
                            <div className="text-sm font-medium">
                                Click to upload or drag and drop
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {file ? (
                                    <span className="text-primary font-medium">{file.name}</span>
                                ) : (
                                    "PDF, PNG, JPG or DOCX (max. 10MB)"
                                )}
                            </div>
                            <Input
                                type="file"
                                className="hidden"
                                id="file-upload"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file-upload"
                                className="absolute inset-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-destructive font-medium text-center bg-destructive/10 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            placeholder="Document Title"
                            className="col-span-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Category
                        </Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {documentTypes.map((type) => (
                                    <SelectItem key={type.DocumentID} value={type.DocumentID.toString()}>
                                        {type.DocumentType}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Optional description..."
                            className="col-span-3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>Cancel</Button>
                    <Button type="submit" className="w-full" onClick={handleUpload} disabled={isLoading || (!editDocument && !file) || !category}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {editDocument ? "Updating..." : "Uploading..."}
                            </>
                        ) : (
                            <>
                                <FileUp className="mr-2 h-4 w-4" /> {editDocument ? "Update Document" : "Upload Document"}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

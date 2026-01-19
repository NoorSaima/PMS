"use client";

import { useState } from "react";
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
import { Plus, Mic, StopCircle, Loader2 } from "lucide-react";

export default function AddTranscriptDialog() {
    const [open, setOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [transcriptText, setTranscriptText] = useState("");

    const toggleRecording = () => {
        if (isRecording) {
            // Stop recording logic simulation
            setIsRecording(false);
        } else {
            // Start recording logic simulation
            setIsRecording(true);
            // Simulate text appearing after a delay
            setTimeout(() => {
                setTranscriptText((prev) => prev ? prev + " Patient reports mild headache..." : "Patient reports mild headache...");
            }, 1500);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Transcript
                </Button>
            </DialogTrigger>
            <DialogContent size="lg" className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>New Transcript</DialogTitle>
                    <DialogDescription>
                        Record or type a new medical transcript.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input type="date" id="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="consultation">Consultation</SelectItem>
                                    <SelectItem value="followup">Follow-up</SelectItem>
                                    <SelectItem value="phone">Phone Call</SelectItem>
                                    <SelectItem value="procedure">Procedure Note</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Visit Subject" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="content">Content</Label>
                            <Button
                                type="button"
                                color={isRecording ? "destructive" : "secondary"}
                                size="sm"
                                className="h-7 text-xs"
                                onClick={toggleRecording}
                            >
                                {isRecording ? (
                                    <>
                                        <StopCircle className="mr-1 h-3 w-3 fill-current" /> Stop Recording
                                    </>
                                ) : (
                                    <>
                                        <Mic className="mr-1 h-3 w-3" /> Start Dictation
                                    </>
                                )}
                            </Button>
                        </div>
                        <div className="relative">
                            <Textarea
                                id="content"
                                placeholder="Type or dictate transcript content..."
                                rows={8}
                                value={transcriptText}
                                onChange={(e) => setTranscriptText(e.target.value)}
                                className={isRecording ? "border-red-400 ring-1 ring-red-400" : ""}
                            />
                            {isRecording && (
                                <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs text-red-500 animate-pulse bg-background px-1 rounded-md">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div> Recording...
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select defaultValue="draft">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="final">Finalized</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={() => setOpen(false)}>Save Transcript</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TranscriptTimeline from "./transcript-timeline";
import AddTranscriptDialog from "./add-transcript-dialog";

export default function TranscriptManager() {
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="px-0 pt-0 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Patient Transcripts</CardTitle>
                        <CardDescription>View timeline of patient interactions and medical transcripts.</CardDescription>
                    </div>
                    <AddTranscriptDialog />
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <TranscriptTimeline />
            </CardContent>
        </Card>
    );
}

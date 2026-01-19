"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, FileText, MoreVertical, User, FileAudio, Calendar } from "lucide-react";

export type Transcript = {
    id: string;
    date: string;
    provider: {
        name: string;
        role: string;
        avatar?: string;
    };
    type: string;
    subject: string;
    preview: string;
    status: "Draft" | "Final" | "Addended";
    audioLength?: string;
};

interface TranscriptCardProps {
    transcript: Transcript;
    isLeft?: boolean; // Kept for prop compatibility though unused in new design
}

export default function TranscriptCard({ transcript }: TranscriptCardProps) {
    return (
        <Card className={cn("w-full group hover:shadow-md transition-all duration-200 border-l-4",
            transcript.status === 'Draft' ? 'border-l-yellow-400' :
                transcript.type === 'Phone Call' ? 'border-l-blue-400' : 'border-l-green-500'
        )}>
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-border">
                            <AvatarImage src={transcript.provider.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary"><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="text-sm font-semibold text-foreground leading-none">{transcript.provider.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{transcript.provider.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                            <Calendar className="h-3 w-3 mr-1" />
                            {transcript.date}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-4 py-2">
                <div className="flex items-center gap-2 mb-2">
                    <Badge color="secondary" className="font-normal text-[10px] uppercase tracking-wider">{transcript.type}</Badge>
                    {transcript.status !== 'Final' && (
                        <Badge color="warning" className="bg-yellow-50">{transcript.status}</Badge>
                    )}
                </div>
                <h3 className="text-base font-medium mb-1.5">{transcript.subject}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {transcript.preview}
                </p>

                {transcript.audioLength && (
                    <div className="mt-3 flex items-center p-2 rounded-md bg-secondary/30 border border-secondary/50 w-fit">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                            <Play className="h-3 w-3 fill-current ml-0.5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-medium uppercase text-muted-foreground tracking-wide">Audio Recording</span>
                            <span className="text-xs font-semibold">{transcript.audioLength}</span>
                        </div>
                        <div className="ml-4 flex gap-0.5 items-end h-4">
                            {/* Fake audio visualization bars */}
                            <div className="w-0.5 h-2 bg-primary/40"></div>
                            <div className="w-0.5 h-3 bg-primary/40"></div>
                            <div className="w-0.5 h-4 bg-primary/60"></div>
                            <div className="w-0.5 h-2 bg-primary/40"></div>
                            <div className="w-0.5 h-3 bg-primary/60"></div>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="p-4 pt-1 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-7 text-xs">View Details</Button>
            </CardFooter>
        </Card>
    );
}

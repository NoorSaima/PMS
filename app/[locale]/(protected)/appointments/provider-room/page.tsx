"use client";

import React, { useState, useEffect } from "react";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    PhoneOff,
    Monitor,
    MessageSquare,
    Users,
    Settings,
    MoreVertical,
    Smile
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const PARTICIPANTS = [
    { id: 1, name: "Dr. Smith (You)", role: "Host", image: "/avatars/01.png" },
    { id: 2, name: "Sarah Patient", role: "Patient", image: "/avatars/02.png" },
];

const MESSAGES = [
    { id: 1, sender: "Sarah Patient", text: "Hello Dr. Smith, I can hear you clearly.", time: "10:02 AM" },
    { id: 2, sender: "Dr. Smith", text: "Great! Let's get started.", time: "10:03 AM" },
];

export default function ProviderRoomPage() {
    const [callStatus, setCallStatus] = useState<'idle' | 'joining' | 'connected'>('idle');
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [activeTab, setActiveTab] = useState<'participants' | 'chat'>('chat');
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(MESSAGES);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Timer for call duration
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (callStatus === 'connected') {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        } else {
            setElapsedTime(0);
        }
        return () => clearInterval(interval);
    }, [callStatus]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setMessages([...messages, {
            id: messages.length + 1,
            sender: "Dr. Smith",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setNewMessage("");
    };

    // --- RENDER: JOIN SCREEN ---
    if (callStatus === 'idle' || callStatus === 'joining') {
        return (
            <div className="flex flex-col h-[calc(100vh-100px)]">
                <SiteBreadcrumb />
                <div className="flex-1 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md p-6 space-y-6 shadow-xl border-slate-200">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Ready to join?</h2>
                            <p className="text-muted-foreground">Check your audio and video before joining the room.</p>
                        </div>

                        {/* Video Preview */}
                        <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                            {isVideoOff ? (
                                <Avatar className="h-24 w-24">
                                    <AvatarFallback className="text-2xl bg-slate-700 text-white">DS</AvatarFallback>
                                </Avatar>
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                    <span className="text-slate-500 text-sm">Camera Preview</span>
                                </div>
                            )}

                            {/* Simple VU Meter Mock */}
                            {!isMuted && (
                                <div className="absolute bottom-4 left-4 flex gap-1 items-end h-4">
                                    <div className="w-1 h-2 bg-green-500 rounded-full animate-pulse " style={{ animationDuration: '0.4s' }}></div>
                                    <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDuration: '0.7s' }}></div>
                                    <div className="w-1 h-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDuration: '0.5s' }}></div>
                                </div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex justify-center gap-4">
                            <Button
                                color={isMuted ? "destructive" : "secondary"}
                                size="icon"
                                className="rounded-full h-12 w-12"
                                onClick={() => setIsMuted(!isMuted)}
                            >
                                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                            </Button>
                            <Button
                                color={isVideoOff ? "destructive" : "secondary"}
                                size="icon"
                                className="rounded-full h-12 w-12"
                                onClick={() => setIsVideoOff(!isVideoOff)}
                            >
                                {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                            </Button>
                        </div>

                        <div className="space-y-3 pt-4">
                            <Button
                                className="w-full h-11 text-base"
                                onClick={() => {
                                    setCallStatus('joining');
                                    setTimeout(() => setCallStatus('connected'), 1500);
                                }}
                                disabled={callStatus === 'joining'}
                            >
                                {callStatus === 'joining' ? 'Connecting...' : 'Join Room'}
                            </Button>
                            <p className="text-xs text-center text-muted-foreground">
                                You will be joining as <strong>Dr. Smith</strong>
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    // --- RENDER: CONNECTED CALL ---
    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] gap-4">
            <SiteBreadcrumb />

            <div className="flex-1 flex gap-4 overflow-hidden relative rounded-xl border bg-slate-950 shadow-2xl">

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col relative">

                    {/* Header Overlay */}
                    <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                        <div className="flex items-center gap-3 pointer-events-auto">
                            <div className="bg-slate-800/80 backdrop-blur text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium">
                                <Users className="h-4 w-4" />
                                <span>Dr. Smith&apos;s Room</span>
                            </div>
                            <div className="bg-slate-800/80 backdrop-blur text-white px-3 py-1.5 rounded-full font-mono text-sm">
                                {formatTime(elapsedTime)}
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20 pointer-events-auto"
                            onClick={() => setShowSidebar(!showSidebar)}
                        >
                            {showSidebar ? <Settings className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
                        </Button>
                    </div>

                    {/* Main Video (Patient) */}
                    <div className="flex-1 flex items-center justify-center bg-slate-900 relative">
                        <div className="text-center space-y-4">
                            <Avatar className="h-32 w-32 mx-auto border-4 border-slate-700">
                                <AvatarFallback className="text-4xl bg-purple-600 text-white">SP</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-xl font-semibold text-white">Sarah Patient</h3>
                                <p className="text-slate-400">Connecting video...</p>
                            </div>
                        </div>

                        {/* Self View (Draggable-ish) */}
                        <div className="absolute bottom-24 right-6 w-48 aspect-video bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden z-20 transition-all hover:scale-105 cursor-move group">
                            {isVideoOff ? (
                                <div className="h-full flex items-center justify-center bg-slate-800">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-slate-600 text-white">DS</AvatarFallback>
                                    </Avatar>
                                </div>
                            ) : (
                                <div className="h-full w-full bg-slate-700 flex items-center justify-center">
                                    <span className="text-xs text-slate-400">You</span>
                                </div>
                            )}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Control Bar */}
                    <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4 px-6 z-30">
                        <Button
                            color={isMuted ? "destructive" : "secondary"}
                            size="icon"
                            className="h-12 w-12 rounded-full shadow-md"
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </Button>
                        <Button
                            color={isVideoOff ? "destructive" : "secondary"}
                            size="icon"
                            className="h-12 w-12 rounded-full shadow-md"
                            onClick={() => setIsVideoOff(!isVideoOff)}
                        >
                            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                        </Button>
                        <Button
                            color="secondary"
                            size="icon"
                            className="h-12 w-12 rounded-full shadow-md hover:bg-slate-700 bg-slate-800 border border-slate-700 text-white"
                        >
                            <Monitor className="h-5 w-5" />
                        </Button>
                        <Button
                            color="destructive"
                            size="icon"
                            className="h-12 w-16 rounded-full shadow-md"
                            onClick={() => setCallStatus('idle')}
                        >
                            <PhoneOff className="h-6 w-6" />
                        </Button>
                        <Button
                            color="secondary"
                            size="icon"
                            className="h-12 w-12 rounded-full shadow-md hover:bg-slate-700 bg-slate-800 border border-slate-700 text-white lg:hidden"
                            onClick={() => setShowSidebar(!showSidebar)}
                        >
                            <MessageSquare className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Sidebar (Chat & Participants) */}
                {showSidebar && (
                    <div className="w-80 bg-white border-l border-slate-200 flex flex-col shadow-xl absolute inset-y-0 right-0 lg:relative lg:shadow-none z-40 transition-all">
                        <div className="flex items-center p-2 border-b">
                            <Button
                                variant="ghost"
                                className={cn("flex-1 text-sm font-medium", activeTab === 'chat' && "bg-slate-100 text-primary")}
                                onClick={() => setActiveTab('chat')}
                            >
                                Chat
                            </Button>
                            <Button
                                variant="ghost"
                                className={cn("flex-1 text-sm font-medium", activeTab === 'participants' && "bg-slate-100 text-primary")}
                                onClick={() => setActiveTab('participants')}
                            >
                                Participants ({PARTICIPANTS.length})
                            </Button>
                        </div>

                        <div className="flex-1 overflow-hidden relative">
                            {activeTab === 'chat' ? (
                                <div className="absolute inset-0 flex flex-col">
                                    <ScrollArea className="flex-1 p-4">
                                        <div className="space-y-4">
                                            {messages.map((msg) => (
                                                <div key={msg.id} className={cn("flex flex-col max-w-[85%]", msg.sender === 'Dr. Smith' ? "ml-auto items-end" : "items-start")}>
                                                    <div className={cn(
                                                        "px-3 py-2 rounded-lg text-sm",
                                                        msg.sender === 'Dr. Smith'
                                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                                            : "bg-slate-100 text-slate-800 rounded-tl-none"
                                                    )}>
                                                        {msg.text}
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                    <div className="p-3 border-t bg-slate-50">
                                        <form onSubmit={handleSendMessage} className="flex gap-2">
                                            <Input
                                                placeholder="Type a message..."
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                className="bg-white"
                                            />
                                            <Button type="submit" size="icon" className="shrink-0">
                                                <Smile className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <ScrollArea className="h-full p-2">
                                    <div className="space-y-1">
                                        {PARTICIPANTS.map((participant) => (
                                            <div key={participant.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-sm font-medium truncate">{participant.name}</p>
                                                    <p className="text-xs text-muted-foreground">{participant.role}</p>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4 text-slate-400" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

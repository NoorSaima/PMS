"use client";

import TranscriptCard, { Transcript } from "./transcript-card";

const mockTranscripts: Transcript[] = [
    {
        id: "TR-001",
        date: "2024-05-15",
        provider: { name: "Dr. Sarah Smith", role: "Cardiologist", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
        type: "Consultation",
        subject: "Follow-up on palpitations",
        preview: "Patient reports significant improvement in symptoms after starting the new medication. No recurring episodes of tachycardia noted in the past 2 weeks. BP is stable at 120/80.",
        status: "Final",
        audioLength: "04:32"
    },
    {
        id: "TR-002",
        date: "2024-05-01",
        provider: { name: "Nurse Jacky", role: "Triage" },
        type: "Phone Call",
        subject: "Patient Inquiry regarding side effects",
        preview: "Patient called complaining of mild dizziness. Advised to take medication with food and stay hydrated.",
        status: "Final",
    },
    {
        id: "TR-003",
        date: "2024-04-20",
        provider: { name: "Dr. Emily Clark", role: "PCP", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
        type: "Initial Visit",
        subject: "Annual Physical Exam",
        preview: "Annual checkup. Patient is a 45-year-old male with no significant past medical history. Complaints of occasional fatigue. Ordered standard blood panel.",
        status: "Final",
        audioLength: "15:10"
    },
    {
        id: "TR-004",
        date: "2024-04-18",
        provider: { name: "Dr. Emily Clark", role: "PCP", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
        type: "Lab Review",
        subject: "Review of Blood Work",
        preview: "CBC and Lipid panel results reviewed. Cholesterol slightly elevated. Advised diet modification. Will recheck in 6 months.",
        status: "Draft",
    },
];

export default function TranscriptTimeline() {
    return (
        <div className="relative py-8 pl-8 pr-4 w-full">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-4 bottom-4 w-px bg-border"></div>

            <div className="space-y-8">
                {mockTranscripts.map((transcript, index) => {
                    return (
                        <div key={transcript.id} className="relative pl-8">

                            {/* Dot on the timeline - varying color based on status/type */}
                            <div className={`absolute left-[-5px] top-6 w-3 h-3 rounded-full border-2 border-background z-10 shadow-sm
                        ${transcript.type === 'Phone Call' ? 'bg-blue-500' :
                                    transcript.status === 'Draft' ? 'bg-yellow-500' : 'bg-green-500'}
                    `}></div>

                            {/* The Card */}
                            <div className="w-full">
                                <TranscriptCard transcript={transcript} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-start ml-8 pl-4 mt-8 pb-4 text-muted-foreground text-sm">
                <span className="bg-background px-2 relative z-10 text-xs uppercase tracking-widest opacity-70">Begin of records</span>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit, Siren, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientEmergencyContactDialog from "./patient-emergency-contact-dialog";
import { useToast } from "@/components/ui/use-toast";

interface EmergencyContact {
    id: string;
    relation: string;
    personName: string;
    cellNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    email: string;
}

interface PatientEmergencyContactListProps {
    patientId?: string | number;
}

const PatientEmergencyContactList: React.FC<PatientEmergencyContactListProps> = ({ patientId }) => {
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [contacts, setContacts] = useState<EmergencyContact[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            if (!patientId || patientId === 'new-patient' || patientId === 'New') return;

            setIsLoading(true);
            try {
                const res = await fetch(`/api/patients/realation/get-relation-info?PatientID=${patientId}`);
                if (!res.ok) throw new Error("Failed to fetch contacts");

                const result = await res.json();

                // Inspecting the response based on user's input:
                // [{ "Name": "...", "Address": "...", "CellNo": "...", "RelationtoPatient": "...", "PatientECID": "..." }]

                const mappedContacts: EmergencyContact[] = Array.isArray(result) ? result.map((item: any) => ({
                    id: item.PatientECID,
                    relation: item.RelationtoPatient,
                    personName: item.Name,
                    cellNumber: item.CellNo,
                    address: item.Address,
                    // Fields not in the provided snippet, defaulting to empty or potentially present
                    city: item.City || "",
                    state: item.State || "",
                    zipCode: item.Zipcode || "",
                    email: item.Email || ""
                })) : [];

                setContacts(mappedContacts);
            } catch (error) {
                console.error("Error fetching contacts:", error);
                toast({
                    title: "Error",
                    description: "Failed to load emergency contacts.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchContacts();
    }, [patientId, toast]);

    const handleSaveContact = async (contactData: any) => {
        if (!patientId || patientId === 'new-patient' || patientId === 'New') {
            toast({
                title: "Error",
                description: "Save patient profile first.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                PatientPID: patientId,
                LastName: contactData.lastName,
                FirstName: contactData.firstName,
                MiddleName: contactData.middleName,
                Address: contactData.address,
                City: contactData.city,
                State: contactData.state,
                Zipcode: contactData.zipCode,
                Email: contactData.email,
                CellNo: contactData.cellNumber,
                RelationtoEC: contactData.relation,
                // AddedBy handled by backend session
            };

            const res = await fetch('/api/patients/realation/add-relation-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to add contact");

            // Optimistically add to UI for now since we don't have a GET API yet
            const newContact: EmergencyContact = {
                id: contactData.id || Math.random().toString(), // Use ID from dialog or generate
                relation: contactData.relation,
                personName: contactData.personName,
                cellNumber: contactData.cellNumber,
                address: contactData.address,
                city: contactData.city,
                state: contactData.state,
                zipCode: contactData.zipCode,
                email: contactData.email
            };
            setContacts([...contacts, newContact]);

            toast({
                title: "Success",
                description: "Emergency contact added successfully.",
                variant: "default",
                className: "bg-green-500 text-white border-none"
            });
        } catch (error) {
            console.error("Error adding contact:", error);
            toast({
                title: "Error",
                description: "Failed to add emergency contact.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [dialogMode, setDialogMode] = useState<'add' | 'view'>('add');

    const handleView = async (id: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/patients/realation/get-patient-relation-detail?PatientECId=${id}`);
            if (!res.ok) throw new Error("Failed to fetch contact details");
            const data = await res.json();
            setSelectedContact(data);
            setDialogMode('view');
            setIsDialogOpen(true);
        } catch (error) {
            console.error("Error fetching contact details:", error);
            toast({
                title: "Error",
                description: "Failed to load contact details.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNew = () => {
        setSelectedContact(null);
        setDialogMode('add');
        setIsDialogOpen(true);
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-base font-medium flex items-center gap-2 text-primary">
                    <Siren className="h-4 w-4" />
                    Emergency Contacts
                </CardTitle>
                <Button size="sm" onClick={handleAddNew} variant="outline" disabled={isLoading}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                </Button>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Relation to Patient</TableHead>
                                <TableHead>Person Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                        No emergency contacts found. Click &quot;Add Contact&quot; to add one.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                contacts.map((contact) => (
                                    <TableRow key={contact.id}>
                                        <TableCell>{contact.relation}</TableCell>
                                        <TableCell>{contact.personName}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-sm">
                                                <span>{contact.cellNumber}</span>
                                                <span className="text-muted-foreground text-xs">{contact.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>{contact.address}</div>
                                                <div className="text-muted-foreground text-xs">
                                                    {contact.city}, {contact.state} {contact.zipCode}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleView(contact.id)}
                                                    disabled={isLoading}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>

            <PatientEmergencyContactDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveContact}
                mode={dialogMode}
                initialData={selectedContact}
            />
        </Card>
    );
};

export default PatientEmergencyContactList;

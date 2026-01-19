"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditReferralDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referralData: any;
  onSuccess?: () => void;
}

interface ConsultationType {
  ConsultID: number;
  Name: string;
}

export default function EditReferralDialog({
  open,
  onOpenChange,
  referralData,
  onSuccess,
}: EditReferralDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [consultationTypes, setConsultationTypes] = useState<
    ConsultationType[]
  >([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);

  // Referred To State
  const [rtFirst, setRtFirst] = useState("");
  const [rtMiddle, setRtMiddle] = useState("");
  const [rtLast, setRtLast] = useState("");
  const [rtSuffix, setRtSuffix] = useState("");

  // Referred By State
  const [rbFirst, setRbFirst] = useState("");
  const [rbMiddle, setRbMiddle] = useState("");
  const [rbLast, setRbLast] = useState("");
  const [rbSuffix, setRbSuffix] = useState("");

  // Details State
  const [consultationType, setConsultationType] = useState("");
  const [referralType, setReferralType] = useState("1");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchConsultationTypes = async () => {
      setIsLoadingTypes(true);
      try {
        const response = await fetch("/api/patients/consultation-type");
        if (!response.ok) {
          throw new Error("Failed to fetch consultation types");
        }
        const data = await response.json();
        setConsultationTypes(data.data);
      } catch (error: any) {
        console.error("Error fetching consultation types:", error);
        toast.error("Failed to load consultation types");
      } finally {
        setIsLoadingTypes(false);
      }
    };

    fetchConsultationTypes();
  }, []);

  useEffect(() => {
    if (referralData && open) {
      setRtFirst(referralData.RefferedToFirstName || "");
      setRtMiddle(referralData.RefferedToMiddleName || "");
      setRtLast(referralData.RefferedToLastName || "");
      setRtSuffix(referralData.RefferedToSuffix || "");
      setRbFirst(referralData.RefferedByFirstName || "");
      setRbMiddle(referralData.RefferedByMiddleName || "");
      setRbLast(referralData.RefferedByLastName || "");
      setRbSuffix(referralData.RefferedBySuffix || "");
      setConsultationType(String(referralData.ConsultationTypeID) || "");
      setReferralType(String(referralData.ReffertypeId) || "1");
      setDate(
        referralData.Date
          ? new Date(referralData.Date).toISOString().split("T")[0]
          : ""
      );
      setReason(referralData.ReasonforReferrel || "");
    }
  }, [referralData, open]);

  const handleSave = async () => {
    if (
      !rtFirst ||
      !rtLast ||
      !rbFirst ||
      !rbLast ||
      !consultationType ||
      !reason
    ) {
      toast.error("Please fill in all required fields (Names, Type, Reason)");
      return;
    }

    setIsLoading(true);

    const payload = {
      PatientReferralID: String(referralData.PatientReferralID),
      RefferedToFirstName: rtFirst,
      RefferedToLastName: rtLast,
      RefferedToMiddleName: rtMiddle,
      RefferedToSuffix: rtSuffix,
      ConsultationType: consultationType,
      ReasonforReferrel: reason,
      RefferedByFirstName: rbFirst,
      RefferedByLastName: rbLast,
      RefferedByMiddleName: rbMiddle,
      RefferedBySuffix: rbSuffix,
      Date: date,
      RefferType: parseInt(referralType),
    };

    try {
      const response = await fetch("/api/patients/update-patient-referral", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update referral");
      }

      toast.success("Referral updated successfully");
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg" className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Referral</DialogTitle>
          <DialogDescription>Update the referral record.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Referred To Section */}
          <div className="space-y-4 border p-4 rounded-lg bg-muted/20">
            <h4 className="font-medium text-sm text-primary">Referred To</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rt-first">First Name *</Label>
                <Input
                  id="rt-first"
                  placeholder="First Name"
                  value={rtFirst}
                  onChange={(e) => setRtFirst(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rt-middle">Middle Name</Label>
                <Input
                  id="rt-middle"
                  placeholder="Middle"
                  value={rtMiddle}
                  onChange={(e) => setRtMiddle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rt-last">Last Name *</Label>
                <Input
                  id="rt-last"
                  placeholder="Last Name"
                  value={rtLast}
                  onChange={(e) => setRtLast(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rt-suffix">Suffix</Label>
                <Input
                  id="rt-suffix"
                  placeholder="Suffix"
                  value={rtSuffix}
                  onChange={(e) => setRtSuffix(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Referred By Section */}
          <div className="space-y-4 border p-4 rounded-lg bg-muted/20">
            <h4 className="font-medium text-sm text-primary">Referred By</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rb-first">First Name *</Label>
                <Input
                  id="rb-first"
                  placeholder="First Name"
                  value={rbFirst}
                  onChange={(e) => setRbFirst(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rb-middle">Middle Name</Label>
                <Input
                  id="rb-middle"
                  placeholder="Middle"
                  value={rbMiddle}
                  onChange={(e) => setRbMiddle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rb-last">Last Name *</Label>
                <Input
                  id="rb-last"
                  placeholder="Last Name"
                  value={rbLast}
                  onChange={(e) => setRbLast(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rb-suffix">Suffix</Label>
                <Input
                  id="rb-suffix"
                  placeholder="Suffix"
                  value={rbSuffix}
                  onChange={(e) => setRbSuffix(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="consulType">Consultation Type *</Label>
              <Select
                value={consultationType}
                onValueChange={setConsultationType}
                disabled={isLoadingTypes}
              >
                <SelectTrigger id="consulType">
                  <SelectValue
                    placeholder={isLoadingTypes ? "Loading..." : "Select Type"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {consultationTypes.map((type) => (
                    <SelectItem
                      key={type.ConsultID}
                      value={String(type.ConsultID)}
                    >
                      {type.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="refType">Referral Type</Label>
              <Select value={referralType} onValueChange={setReferralType}>
                <SelectTrigger id="refType">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Incoming</SelectItem>
                  <SelectItem value="2">Outgoing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              className="w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Referral *</Label>
            <Textarea
              id="reason"
              placeholder="Enter reason..."
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Referral
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

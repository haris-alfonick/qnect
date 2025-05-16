import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Company {
  id: number;
  name: string;
}

interface CompanySelectionDialogProps {
  isOpen: boolean;
  companies: Company[];
  onSelect: (companyId: string) => void;
  onClose: () => void;
}

export default function CompanySelectionDialog({
  isOpen,
  companies,
  onSelect,
  onClose,
}: CompanySelectionDialogProps) {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");

  const handleSelect = () => {
    if (selectedCompanyId) {
      onSelect(selectedCompanyId);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Company</DialogTitle>
          <DialogDescription>
            Please select a company to proceed with the checkout.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup
            value={selectedCompanyId}
            onValueChange={setSelectedCompanyId}
            className="grid gap-4"
          >
            {companies.map((company) => (
              <div key={company.id} className="flex items-center space-x-2">
                <RadioGroupItem value={company.id.toString()} id={`company-${company.id}`} />
                <Label htmlFor={`company-${company.id}`}>{company.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSelect} disabled={!selectedCompanyId}>
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
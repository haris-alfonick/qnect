import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Company {
  id: number;
  name: string;
}

interface CompanySelectionDialogProps {
  open: boolean;
  companies: Company[];
  onSelect: (companyId: string) => void;
}

export function CompanySelectionDialog({
  open,
  companies,
  onSelect,
}: CompanySelectionDialogProps) {
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  const handleSelect = () => {
    if (selectedCompany) {
      onSelect(selectedCompany);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Company</DialogTitle>
          <DialogDescription>
            Please select a company to proceed with the purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={selectedCompany}
            onValueChange={setSelectedCompany}
            className="space-y-4"
          >
            {companies.map((company) => (
              <div key={company.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={company.id.toString()}
                  id={`company-${company.id}`}
                />
                <Label htmlFor={`company-${company.id}`}>{company.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => onSelect('')}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSelect}
            disabled={!selectedCompany}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
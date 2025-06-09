import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MemberPermissions {
  fullAccess: boolean;
  viewOnly: boolean;
  transactionApprovalRequired: boolean;
  spendingLimit?: number;
}

interface JointAccountControlsProps {
  memberName: string;
  permissions: MemberPermissions;
  onPermissionsChange: (newPermissions: MemberPermissions) => void;
  currencySymbol?: string;
}

const JointAccountControls: React.FC<JointAccountControlsProps> = ({
  memberName,
  permissions,
  onPermissionsChange,
  currencySymbol = '$',
}) => {
  console.log("Rendering JointAccountControls for:", memberName);

  const handleSwitchChange = (field: keyof Pick<MemberPermissions, 'fullAccess' | 'viewOnly' | 'transactionApprovalRequired'>, checked: boolean) => {
    const newPermissions = { ...permissions, [field]: checked };
    // Logic: if fullAccess is true, other restrictions might be implicitly false or disabled
    if (field === 'fullAccess' && checked) {
        newPermissions.viewOnly = false;
        newPermissions.transactionApprovalRequired = false;
    } else if ((field === 'viewOnly' && checked) || (field === 'transactionApprovalRequired' && checked)) {
        newPermissions.fullAccess = false;
    }
    onPermissionsChange(newPermissions);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = e.target.value ? parseFloat(e.target.value) : undefined;
    onPermissionsChange({ ...permissions, spendingLimit: limit });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Permissions for {memberName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor={`fullAccess-${memberName}`} className="flex flex-col space-y-1">
            <span>Full Access</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Can perform all actions on this account.
            </span>
          </Label>
          <Switch
            id={`fullAccess-${memberName}`}
            checked={permissions.fullAccess}
            onCheckedChange={(checked) => handleSwitchChange('fullAccess', checked)}
            disabled={permissions.viewOnly} // Disable if viewOnly is active
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor={`viewOnly-${memberName}`} className="flex flex-col space-y-1">
            <span>View Only</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Can only view account details and transactions.
            </span>
          </Label>
          <Switch
            id={`viewOnly-${memberName}`}
            checked={permissions.viewOnly}
            onCheckedChange={(checked) => handleSwitchChange('viewOnly', checked)}
            disabled={permissions.fullAccess} // Disable if fullAccess is active
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor={`approval-${memberName}`} className="flex flex-col space-y-1">
            <span>Transaction Approval Required</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Requires approval for outgoing transactions.
            </span>
          </Label>
          <Switch
            id={`approval-${memberName}`}
            checked={permissions.transactionApprovalRequired}
            onCheckedChange={(checked) => handleSwitchChange('transactionApprovalRequired', checked)}
            disabled={permissions.fullAccess || permissions.viewOnly} // Disable if fullAccess or viewOnly
          />
        </div>

        <div>
          <Label htmlFor={`spendingLimit-${memberName}`}>Spending Limit (per transaction)</Label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-muted-foreground sm:text-sm">{currencySymbol}</span>
            </div>
            <Input
                id={`spendingLimit-${memberName}`}
                type="number"
                placeholder="No limit"
                value={permissions.spendingLimit === undefined ? '' : permissions.spendingLimit}
                onChange={handleInputChange}
                className="pl-7"
                disabled={permissions.fullAccess || permissions.viewOnly} // Disable if fullAccess or viewOnly
            />
          </div>
           {permissions.spendingLimit !== undefined && permissions.spendingLimit <=0 && (
             <p className="text-xs text-destructive mt-1">Spending limit must be a positive number or empty for no limit.</p>
           )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JointAccountControls;
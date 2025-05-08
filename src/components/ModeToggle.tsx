
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ModeToggleProps {
  isTimedMode: boolean;
  onModeChange: (isTimedMode: boolean) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ isTimedMode, onModeChange }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-6 font-serif">
      <Label htmlFor="mode-toggle" className={`text-sm font-medium ${!isTimedMode ? 'text-primary' : 'text-muted-foreground'}`}>
        Standard Mode
      </Label>
      <Switch
        id="mode-toggle"
        checked={isTimedMode}
        onCheckedChange={onModeChange}
        className={`${isTimedMode ? 'bg-primary' : 'bg-muted'} mode-toggle`}
      />
      <Label htmlFor="mode-toggle" className={`text-sm font-medium ${isTimedMode ? 'text-primary' : 'text-muted-foreground'}`}>
        Timed Mode
      </Label>
    </div>
  );
};

export default ModeToggle;

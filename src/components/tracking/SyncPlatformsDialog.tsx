
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { formatPlatformName } from "@/utils/fitnessSyncUtils";
import { UserData } from "@/context/UserContext";

interface SyncPlatformsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  syncPlatforms: Array<keyof UserData["fitness"]>;
  selectedPlatforms: Array<keyof UserData["fitness"]>;
  onTogglePlatform: (platform: keyof UserData["fitness"]) => void;
  onSkipSync: () => void;
  onSyncAndSave: () => void;
}

const SyncPlatformsDialog: React.FC<SyncPlatformsDialogProps> = ({
  open,
  onOpenChange,
  syncPlatforms,
  selectedPlatforms,
  onTogglePlatform,
  onSkipSync,
  onSyncAndSave,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sync Workout</DialogTitle>
          <DialogDescription>
            Choose fitness platforms to sync this workout with:
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {syncPlatforms.map(platform => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox 
                id={`sync-${platform}`}
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={() => onTogglePlatform(platform)}
              />
              <label
                htmlFor={`sync-${platform}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {formatPlatformName(platform)}
              </label>
            </div>
          ))}
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button 
            variant="outline" 
            onClick={onSkipSync}
          >
            Skip Sync
          </Button>
          <Button 
            onClick={onSyncAndSave}
            className="bg-neon-cyan hover:bg-neon-cyan/80"
          >
            Sync & Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SyncPlatformsDialog;

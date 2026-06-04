import { Bell } from "lucide-react";

type NotificationToastProps = {
  onClose: () => void;
};

export function NotificationToast({ onClose }: NotificationToastProps) {
  return (
    <div className="fixed top-4 right-4 bg-card border border-border rounded-lg shadow-lg p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start gap-3">
        <Bell className="w-5 h-5 text-primary" />
        <div>
          <h4 className="font-semibold text-sm mb-1">Deal Desk Alert</h4>
          <p className="text-xs text-muted-foreground">
            3 brand negotiations need manager review
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      </div>
    </div>
  );
}

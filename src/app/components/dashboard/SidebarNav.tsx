import { BarChart3, Briefcase, HelpCircle, Inbox } from "lucide-react";

type SidebarNavProps = {
  activeNav: string;
  onActiveNavChange: (nav: string) => void;
};

const navItems = [
  { id: "deals", icon: Briefcase, label: "Brand Deals" },
  { id: "inbox", icon: Inbox, label: "Inbox" },
  { id: "analytics", icon: BarChart3, label: "Engagement Analytics" },
];

export function SidebarNav({ activeNav, onActiveNavChange }: SidebarNavProps) {
  return (
    <aside className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 gap-6">
      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
        TM
      </div>
      <nav className="flex flex-col gap-4">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onActiveNavChange(id)}
            aria-label={label}
            title={label}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeNav === id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-4">
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 rounded-full bg-muted overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </aside>
  );
}

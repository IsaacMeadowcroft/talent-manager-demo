# Influencer Manager Platform Design System

## Aesthetic Stance
**Data-dense professional command center** — Maximum information density with functional color coding, small tabular fonts, tight spacing, and clean card-based organization. Inspired by Bloomberg Terminal and modern SaaS dashboards but with lighter, more accessible styling.

## Typography
- **UI Font**: Archivo (400, 500, 600, 700) — Clean, geometric sans-serif optimized for UI density
- **Data Font**: DM Mono (400, 500) — Monospace for metrics, handles, and numerical data
- **Base Size**: 14px for data-dense information display

## Color System

### Primary Colors
- **Emerald** `#10b981` — Metrics, engagement rates, growth indicators, positive trends
- **Sapphire** `#2563eb` — Primary actions, buttons, interactive elements
- **Violet** `#8b5cf6` — AI-powered features, machine learning indicators, automation

### Neutral Palette
- Background: `#fafbfc` (light gray-blue)
- Card: `#ffffff` (pure white)
- Foreground: `#0f172a` (dark slate)
- Muted: `#f8fafc` (subtle gray)
- Border: `#e2e8f0` (hairline gray)

### Semantic Colors
- Muted Text: `#64748b`
- Destructive: `#ef4444`
- Success: `#10b981` (shares emerald)

## Layout Principles

### Grid Structure
- **Sidebar**: 64px fixed width, icon-only navigation
- **Discovery Panel**: 25% width (3/12 columns), scrollable
- **Deep Dive Panel**: ~42% width (5/12 columns), scrollable
- **Outreach Panel**: ~33% width (4/12 columns), fixed height sections

### Spacing
- Component gap: 12px (0.75rem)
- Card padding: 16px (1rem)
- Section padding: 24px (1.5rem)
- Tight data rows: 8px vertical

### Cards
- White background on light gray canvas
- 1px border `#e2e8f0`
- 8px border radius
- Subtle hover states on interactive cards

## Component Patterns

### Creator Cards
- Circular avatar (48px)
- Multi-platform handles with icons
- Inline sparkline charts (emerald)
- Monospace metrics and follower counts
- Selected state: primary border + light background tint

### Metrics Cards
- Label + percentage change in header
- Line chart visualization (emerald for growth)
- Large monospace value below
- 2-column grid for paired metrics

### AI Components
- Violet accent color `#8b5cf6`
- Gradient background `from-violet/10 to-violet/5`
- Violet border at 30% opacity
- Sparkles icon indicator
- Clear "AI" or "Powered by ML" labeling

### Data Tables
- Dense 4-column grid
- Monospace for numerical data
- Hairline borders between rows
- Hover states for interactivity
- Icons for trend indicators

### Messaging Interface
- Avatar with platform icon badge overlay
- Unread indicator: small blue dot
- Monospace timestamps
- Selected state: muted background
- Platform filter buttons

### Network Diagrams
- Circular platform icons with brand colors
- ChevronRight connectors
- Follower counts below handles
- Even horizontal spacing

## Iconography
- Lucide React icon set
- 16px (w-4 h-4) for inline icons
- 20px (w-5 h-5) for navigation and headers
- Muted color for non-interactive, full color when active

## Interactive States
- Hover: subtle background change or opacity shift
- Focus: ring in primary color
- Active/Selected: primary border + background tint
- Disabled: 50% opacity

## Data Visualization
- Recharts for all charts
- Line charts for trends (no dots on line)
- Emerald `#10b981` for positive metrics
- Sapphire `#2563eb` for neutral data
- 2px stroke width for emphasis charts
- 1.5px for sparklines
- Tooltips with white background and border

## Micro-interactions
- 150ms transition duration for most interactions
- Opacity changes for button hover states
- Background color transitions for card selection
- Subtle badge indicators for notifications

## Accessibility
- Body text meets AA contrast (4.5:1)
- Interactive elements have visible focus states
- Color is supplemented with icons and labels
- Monospace font aids numerical scanning
- All images have descriptive alt text

## Content Guidelines
- Use realistic placeholder data (real names, dates, numbers)
- Handles prefixed with @ symbol
- Currency formatted with $ and commas
- Percentages to 1 decimal place
- Dates in YYYY-MM-DD format for data tables
- Relative time (2h ago, 1d ago) for messaging

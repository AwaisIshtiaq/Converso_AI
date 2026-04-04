# Converso

**Real-time AI Teaching Platform**

Converso is a Next.js-powered SaaS application that enables users to create AI teaching companions for interactive learning sessions. Built with modern React patterns, TypeScript, and Tailwind CSS.

## Features

- **AI Teaching Companions** — Create customizable AI companions for different subjects (Science, Math, Language, Coding, History, Economics)
- **Interactive Sessions** — Real-time voice conversations with your AI companion
- **Session Management** — Track completed sessions and lesson history
- **Customizable Personalities** — Configure voice, style, and lesson duration
- **Responsive Design** — Fully responsive UI with modern aesthetics

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Font**: Bricolage Grotesque + Geist

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/AwaisIshtiaq/Converso_AI.git
cd Converso_AI

# Install dependencies
bun install
# or
npm install
```

### Development

```bash
# Run the development server
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
bun run build
# or
npm run build
```

## Project Structure

```
app/
├── page.tsx                 # Homepage with popular companions
├── layout.tsx               # Root layout with navigation
├── globals.css              # Global styles and Tailwind config
├── companions/
│   ├── page.tsx             # Companions library listing
│   └── New/
│       └── page.tsx         # Create new companion form
├── companion/
│   └── [id]/
│       └── page.tsx         # Individual companion session
└── subscription/
    └── page.tsx             # Subscription plans

components/
├── CompanionCard.tsx        # Companion display card
├── CompanionsList.tsx       # Table view of companions
├── CompanionForm.tsx        # New companion creation form
├── CTA.tsx                  # Call-to-action section
└── ui/                      # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── field.tsx
    ├── form.tsx
    ├── input.tsx
    └── table.tsx

constants/
└── index.ts                 # App constants and mock data

types/
└── index.d.ts               # TypeScript type definitions
```

## Key Components

### CompanionForm
Multi-step form for creating AI teaching companions with:
- Name input with validation
- Subject selection (dropdown)
- Topic input
- Voice selection (Male/Female, Casual/Formal)
- Style selection (Friendly, Professional, Playful, Strict)
- Duration configuration
- Real-time validation with error messages

### CompanionCard
Display card for companions featuring:
- Subject badge with color coding
- Bookmark functionality
- Duration display
- "Launch Lesson" CTA button

### CompanionsList
Table view for recently completed sessions with:
- Lesson icon with subject color
- Subject badge
- Duration column
- Clickable rows for session details

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

Built with ❤️ using [Next.js](https://nextjs.org) and [shadcn/ui](https://ui.shadcn.com)

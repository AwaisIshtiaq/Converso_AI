# Converso

**Real-time AI Teaching Platform**

Converso is a Next.js-powered SaaS application that enables users to create AI teaching companions for interactive learning sessions. Built with modern React patterns, TypeScript, and Tailwind CSS.

## Features

- **AI Teaching Companions** — Create customizable AI companions for different subjects (Science, Math, Language, Coding, History, Economics)
- **Interactive Sessions** — Real-time voice conversations with your AI companion
- **Session Management** — Track completed sessions and lesson history
- **Companion Library** — Browse and search all your companions with filtering by subject and topic
- **Customizable Personalities** — Configure voice, style, and lesson duration
- **Responsive Design** — Fully responsive UI with modern aesthetics

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + shadcn/ui
- **Database**: [Supabase](https://supabase.com) (PostgreSQL + Auth)
- **Authentication**: [Clerk](https://clerk.com) (Next.js integration)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Font**: Bricolage Grotesque + Geist

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git
- Supabase account (for database)
- Clerk account (for authentication)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

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
bun dev
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
│   ├── page.tsx             # Companions library with search/filter
│   ├── New/
│   │   └── page.tsx        # Create new companion form
│   └── [id]/
│       └── page.tsx        # Individual companion session
└── subscription/
    └── page.tsx             # Subscription plans

components/
├── CompanionCard.tsx        # Companion display card
├── CompanionsList.tsx       # Table view of companions
├── CompanionForm.tsx        # New companion creation form
├── SearchInput.tsx          # Search companions by topic
├── SearchFilter.tsx         # Filter companions by subject
├── CTA.tsx                  # Call-to-action section
└── ui/                      # shadcn/ui components

lib/
├── supabase.ts              # Supabase client configuration
├── actions/
│   └── companion.actions.ts # Server actions for companion CRUD
└── utils.ts                 # Utility functions

constants/
└── index.ts                 # App constants and mock data

types/
└── index.d.ts               # TypeScript type definitions
```

## Database Schema

### companions table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | varchar | Companion name |
| subject | varchar | Subject category |
| topic | varchar | Learning topic |
| duration | integer | Lesson duration (minutes) |
| voice | varchar | Voice type (Male/Female) |
| style | varchar | Teaching style |
| author | uuid | User ID from Clerk |
| created_at | timestamp | Creation timestamp |

## API Routes

### Server Actions

- `CreateCompanion(formData)` — Create a new companion
- `getAllCompanions({limit, page, subject, topic})` — List companions with filtering

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

### SearchInput
Search component for finding companions by topic:
- Debounced input (300ms)
- URL query parameter integration
- Clear button support

### SearchFilter
Filter component for narrowing down companions:
- Subject dropdown
- URL query parameter integration
- Instant filtering

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

Built with ❤️ using [Next.js](https://nextjs.org), [Supabase](https://supabase.com), [Clerk](https://clerk.com), and [shadcn/ui](https://ui.shadcn.com)
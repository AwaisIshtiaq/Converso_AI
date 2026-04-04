# Converso

**Real-time AI Teaching Platform**

Converso is a Next.js-powered SaaS application that enables users to create AI teaching companions for interactive learning sessions. Built with modern React patterns, TypeScript, Tailwind CSS, Clerk authentication, and Supabase database.

## Features

- **AI Teaching Companions** — Create customizable AI companions for different subjects (Science, Math, Language, Coding, History, Economics)
- **Interactive Sessions** — Real-time voice conversations with your AI companion
- **Session Management** — Track completed sessions and lesson history
- **Customizable Personalities** — Configure voice, style, and lesson duration
- **Responsive Design** — Fully responsive UI with modern aesthetics
- **Secure Authentication** — Clerk-powered auth with JWT integration
- **Database Storage** — Supabase for persistent companion data

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Language**: [TypeScript](https://typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + shadcn/ui
- **Authentication**: [Clerk](https://clerk.com) (Next.js SDK v7)
- **Database**: [Supabase](https://supabase.com) (PostgreSQL + Row Level Security)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Font**: Bricolage Grotesque + Geist

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git
- Supabase account
- Clerk account

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase Setup

1. Create a new Supabase project
2. Create a `companions` table with these columns:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `name` (text, required)
   - `subject` (text, required)
   - `topic` (text)
   - `description` (text)
   - `duration` (integer)
   - `voice` (text)
   - `style` (text)
   - `author` (uuid, references auth.users)
   - `created_at` (timestamptz, default: now())

3. Enable Row Level Security (RLS) on the table
4. Create RLS policies to allow authenticated users to insert/read their own companions

### Clerk JWT Template Setup

1. In Clerk Dashboard, go to **JWT Templates**
2. Create a new Supabase JWT template
3. Configure the JWT claims to match Supabase's requirements:
   - `sub` claim with `user.id`
   - `email` claim with `user.email_addresses[0].email_address`
4. Note the template name (default: `supabase`)

### Installation

```bash
# Clone the repository
git clone https://github.com/AwaisIshtiaq/Converso_AI.git
cd Converso_AI

# Install dependencies
bun install
# or
pnpm install
# or
npm install
```

### Development

```bash
# Run the development server
bun dev
# or
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
bun run build
# or
pnpm build
# or
npm run build
```

## Project Structure

```
app/
├── page.tsx                 # Homepage with popular companions
├── layout.tsx               # Root layout with navigation and providers
├── globals.css              # Global styles and Tailwind config
├── companions/
│   ├── page.tsx             # Companions library listing
│   └── New/
│       └── page.tsx         # Create new companion form
│   └── [id]/
│       └── page.tsx         # Individual companion session page
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
    ├── navbar.tsx
    └── table.tsx

lib/
├── supabase.ts              # Supabase client with Clerk JWT integration
├── actions/
│   └── companion.actions.ts  # Server actions for companion CRUD
└── utils.ts                 # Utility functions

constants/
└── index.ts                 # App constants and mock data

middleware.ts                # Clerk middleware for auth protection
```

## Authentication Flow

1. User visits `/companions/New`
2. Clerk middleware checks if user is authenticated
3. If not signed in, redirects to `/sign-in`
4. After signing in, user can create a companion
5. Server action gets Clerk's JWT token using `getToken({ template: 'supabase' })`
6. Token is passed to Supabase for RLS policy validation

## Key Components

### CompanionForm
Multi-step form for creating AI teaching companions with:
- Name input with validation
- Subject selection (dropdown)
- Topic input
- Voice selection (Male/Female)
- Style selection (Casual/Formal)
- Duration configuration
- Real-time validation with error messages
- Toast notifications for success/error states

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

Built with ❤️ using [Next.js](https://nextjs.org), [Clerk](https://clerk.com), [Supabase](https://supabase.com), and [shadcn/ui](https://ui.shadcn.com)

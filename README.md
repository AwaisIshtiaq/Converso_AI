# Converso

**Real-time AI Teaching Platform**

Converso is a Next.js-powered SaaS application that enables users to create AI teaching companions for interactive learning sessions. Built with modern React patterns, TypeScript, Tailwind CSS, Supabase, and Clerk authentication.

## Features

- **AI Teaching Companions** — Create customizable AI companions for different subjects (Science, Math, Language, Coding, History, Economics)
- **Interactive Sessions** — Real-time voice conversations with your AI companion
- **Session Management** — Track completed sessions and lesson history
- **Companion Library** — Browse all your companions with search by topic and filter by subject
- **Customizable Personalities** — Configure voice, style, and lesson duration
- **Responsive Design** — Fully responsive UI with modern aesthetics
- **Authentication** — Secure user authentication with Clerk
- **Database** — PostgreSQL with Supabase for data persistence

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + shadcn/ui
- **Database**: [Supabase](https://supabase.com) (PostgreSQL)
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
├── layout.tsx               # Root layout with ClerkProvider
├── globals.css              # Global styles and Tailwind config
├── middleware.ts            # Clerk authentication middleware
├── companions/
│   ├── page.tsx             # Companions library with search/filter
│   ├── New/
│   │   └── page.tsx         # Create new companion form
│   └── [id]/
│       ├── page.tsx         # Individual companion session page
│       └── ActionButtons.tsx # Client-side action buttons
└── subscription/
    └── page.tsx             # Subscription plans

components/
├── CompanionCard.tsx        # Companion display card with bookmark
├── CompanionForm.tsx        # New companion creation form
├── SearchInput.tsx          # Search companions by topic/name
├── SearchFilter.tsx         # Filter companions by subject
├── CompanionsList.tsx       # Table view of companions
├── CTA.tsx                  # Call-to-action section
└── ui/                      # shadcn/ui components

lib/
├── supabase.ts              # Supabase client configuration
├── actions/
│   └── companion.actions.ts # Server actions for CRUD operations
└── utils.ts                 # Utility functions

constants/
└── index.ts                 # App constants (subjects, colors, voices)

types/
└── index.d.ts               # TypeScript type definitions
```

## Database Schema

### companions table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | varchar | Companion name |
| subject | varchar | Subject category (science, maths, language, etc.) |
| topic | varchar | Learning topic |
| duration | integer | Lesson duration in minutes |
| voice | varchar | Voice type (Male/Female) |
| style | varchar | Teaching style (Casual/Formal) |
| author | uuid | User ID from Clerk |
| created_at | timestamp | Creation timestamp |

## Server Actions

### CreateCompanion(formData)
Creates a new companion in the database.

```typescript
type CreateCompanionInput = {
  name: string
  subject: string
  topic: string
  voice: string
  style: string
  duration: number
}
```

### getAllCompanions({limit, page, subject, topic})
Fetches companions with optional filtering and pagination.

### getCompanionById(id)
Fetches a single companion by ID.

## Key Components

### CompanionForm
Multi-step form for creating AI teaching companions:
- Name input with validation
- Subject selection dropdown
- Topic input
- Voice selection (Male/Female)
- Style selection (Casual/Formal)
- Duration slider (10-60 minutes)
- Real-time validation with error messages
- Supabase integration for persistence

### CompanionCard
Display card for companions:
- Subject badge with color coding
- Interactive bookmark button
- Duration display with clock icon
- "Launch Lesson" Link button
- Responsive design

### Companion Library (`/companions`)
Browse all your companions:
- **SearchInput**: Debounced search by topic or name (500ms delay)
- **SearchFilter**: Instant filter by subject category
- URL query parameter integration for shareable filtered views
- Empty state with CTA to create companion
- Loading states with skeleton placeholders
- Error handling with retry functionality

### Companion Session (`/companions/[id]`)
Individual companion details:
- Subject icon and color coding
- Voice and style settings display
- Action buttons (Start Session, Edit Companion)
- Breadcrumb navigation
- "Companion Not Found" state with back button

### ActionButtons
Client-side buttons for companion actions:
- Start Session (with coming soon alert)
- Edit Companion (with coming soon alert)
- Back to Library link

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main

```bash
vercel --prod
```

## Environment Setup Tips

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Run the following SQL in the SQL Editor:

```sql
-- Create companions table
CREATE TABLE companions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL,
  voice VARCHAR(20),
  style VARCHAR(20),
  author UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (optional for production)
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for development)
CREATE POLICY "allow_all" ON companions
  FOR ALL USING (true) WITH CHECK (true);
```

3. Copy the Project URL and Anon Key to `.env.local`

### Clerk Setup
1. Create an application at [clerk.com](https://clerk.com)
2. Copy the Publishable Key and Secret Key to `.env.local`
3. Configure sign-in/sign-up URLs in Clerk dashboard

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
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Supabase Schema Setup

To enable saving user plans, tracking credits, and managing subscriptions, run the provided `supabase_schema.sql` file in your Supabase SQL editor. This will create the necessary tables:

- `user_plans`: Stores user assessment summaries.
- `user_credits`: Tracks user credit balances and credit history.
- `user_subscriptions`: Tracks user subscription status, plan type, and renewal info.
- `subscription_plans`: Defines available plans (pay-as-you-go, annual, monthly) and monthly credit allocations.

### Plans
- **Pay as you go**: Purchase credits as needed.
- **Subscription**: $5/month (billed annually) or $7/month (billed monthly). Subscribers receive 500 credits each month automatically.

**To set up:**
1. Open the Supabase dashboard for your project.
2. Go to SQL Editor and run the contents of `supabase_schema.sql`.
3. The app will now be able to save user plans and manage credits/subscriptions.

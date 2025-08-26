# YaYa Wallet Dashboard

A modern, responsive dashboard for monitoring transactions made to/from your YaYa Wallet account.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Features & How to Test

### Search
- Use the search bar to filter transactions by sender, receiver, cause, or transaction ID.
- Press **Search** or hit **Enter** to apply the filter.

### Pagination
- Use the **Prev** and **Next** buttons at the bottom to navigate between pages of transactions.

### Theme Toggling
- Use the theme toggle button (🌙/☀️) in the top right to switch between light and dark mode.
- The dashboard defaults to dark mode.

### Responsiveness
- Resize your browser window or use a mobile device to see the dashboard adapt:
  - On mobile, transactions are shown as cards and some columns are hidden for clarity.
  - On desktop, transactions are shown in a table with all columns visible.

---

## Security: API Credentials

- **API keys and secrets are never exposed to the browser.**
- All requests to YaYa Wallet's REST API are made via server-side API routes (in `/app/api/transactions`).
- API credentials are stored in environment variables (e.g., `.env.local`) and only used server-side.
- **Never commit `.env.local` or credentials to version control.**

---

## Customization
- You can change the default account, theme, or table columns in the code as needed.
- The UI is built with React and Tailwind CSS for easy customization.

---

## Questions?
If you have any issues or questions, feel free to open an issue or contact the maintainer.

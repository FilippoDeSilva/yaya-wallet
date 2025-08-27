# YaYa Wallet Transactions Dashboard

## Overview
This project is a modern, responsive dashboard for securely viewing, searching, and filtering YaYa Wallet account transactions. It is built with Next.js (React), Tailwind CSS, and TypeScript, and integrates with the YaYa Wallet API via secure server-side routes.

---

## Features
- **Responsive UI:** Mobile and desktop layouts, theme toggling (dark/light), skeleton loaders for smooth loading.
- **Search & Filter:** Search by sender, receiver, transaction ID, or cause. Instant clear/reset functionality.
- **Pagination:** Browse transactions page by page.
- **Security:** API credentials are stored server-side and never exposed to the frontend. All requests are signed securely.
- **Error Handling:** Friendly error overlays for network/API issues, including timeouts and upstream errors.
- **Code Quality:** Modular, maintainable, and well-documented codebase.

---

## How to Run Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/FilippoDeSilva/yaya-wallet.git
   cd yaya-wallet
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your YaYa Wallet API credentials:
     ```env
     YAYA_API_KEY=your_api_key_here
     YAYA_API_SECRET=your_api_secret_here
     ```
   - **Never commit your `.env.local` file.**

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Test

- **Manual Testing:**
  - Use the search bar to filter transactions by sender, receiver, transaction ID, or cause.
  - Use the clear button to reset the search and reload all data instantly.
  - Switch between dark and light themes using the theme toggler.
  - Paginate through transactions using the Prev/Next buttons.
  - Try disconnecting your network or using invalid credentials to see error overlays.

- **Automated Testing:**
  - (Optional) Add unit/integration tests using Jest and React Testing Library.

---

## Security Considerations

- **API Credentials:**
  - Credentials are only used server-side in API routes (`/api/transactions`).
  - Never exposed to the frontend or client-side JavaScript.
  - `.env.local` is git-ignored by default.

- **Data Protection:**
  - All requests to YaYa Wallet API are signed using HMAC and timestamped.
  - Sensitive data is never logged or exposed in error messages.

---

## Code Quality & Structure

- **Maintainability:**
  - Modular components (`TransactionsTable`, `ThemeProvider`, etc.)
  - Clear separation of concerns (UI, API, logic)
  - TypeScript for type safety
- **Simplicity:**
  - Minimal dependencies, clean code, and clear comments
- **Structure:**
  - `app/` - Next.js pages and API routes
  - `components/` - Reusable UI components
  - `lib/` - Utility functions (e.g., request signing)

---

## Troubleshooting

- **API Errors / Slow Responses:**
  - If you see 502/504 errors, the YaYa Wallet sandbox API may be slow or down. Try again later or check your credentials.
- **Environment Issues:**
  - Ensure your `.env.local` is present and correct.
  - Restart the dev server after changing environment variables.

---

## License

This project is for demonstration and evaluation purposes only. Please contact the author for production use or licensing details.

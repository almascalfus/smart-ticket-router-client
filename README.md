# Smart Ticket Router - Frontend

A modern **Next.js** frontend for the Smart Ticket Router project. Users can submit support tickets and receive AI-powered issue classification with reasoning, confidence levels, routing information, and performance metrics.

---

## Features

- Modern responsive UI
- Dark theme interface
- AI ticket submission
- Multiple issue visualization
- Scrollable results panel
- Performance metrics
- Confidence badges
- Priority badges
- Human review indicator
- Error handling
- Loading states

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

---

## Project Structure
```text
frontend/
│
├── app/
│ ├── page.tsx
│ └── globals.css
│
├── components/
│
├── interfaces/
│ ├── ticketResponse.ts
│ └── classificationResponse.ts
│
├── public/
│
├── .env.local
│
└── package.json
```
---

## Environment Variables

Create a `.env.local` file

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## Installation

Clone repository

```bash
git clone <repository-url>
```

Navigate

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Application runs on

```
http://localhost:3000
```

---

## User Workflow

1. Enter a support ticket.
2. Click **Classify Ticket**.
3. Ticket is sent to the FastAPI backend.
4. AI analyzes the ticket.
5. Results are displayed in the right panel.
6. Expand **More...** to view routing performance metrics.

---

## UI Features

### Left Panel

- Ticket input
- Classify button
- Usage tips
- Validation messages

### Right Panel

- Scrollable issue cards
- AI reasoning
- Category
- Priority
- Assigned Team
- Confidence Level
- Human Review Status
- Expandable performance metrics

---

## Backend Connection

The frontend communicates with the backend using

```
POST /route-ticket
```

configured through

```env
NEXT_PUBLIC_API_URL
```

making the application deployment-friendly.

---

## Future Enhancements

- Authentication
- Ticket history
- Chat interface
- Theme switching
- Export reports
- Dashboard analytics
- File attachment support
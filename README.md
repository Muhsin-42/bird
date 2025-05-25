# Bird - Social Media Platform
Live Site: [Bird ](https://bird-eight-tan.vercel.app)

Bird is a social media application designed to facilitate engaging conversations through threaded replies.

## Tech Stack

- **FrontEnd**: Next.js 14, Tailwind CSS, ShadCn, Context API
- **Language**: TypeScript
- **Form Validation**: Zod
- **Database**: MongoDB
- **Authentication**: Clerk
- **Linters & Formatters**: ESLint & Prettier

## Features

- Multi-threaded reply feature for engaging conversations
- User-friendly interface powered by Next.js and Tailwind CSS
- TypeScript for type-safe and reliable code
- Form validation using Zod for data integrity
- MongoDB for robust and scalable database operations
- Secure authentication powered by Clerk
- Code consistency maintained by ESLint & Prettier

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up MongoDB and configure Clerk for authentication.
4. Set up .env.local file in root folder.
5. Start the application using `npm run dev`.
6. Explore and contribute to Bird!

 ### Configuration Details
Add the following environment variables in your `.env.local` file:

```env.local
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_public_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# MongoDB Configuration
MONGODB_URL=your_mongodb_database_url

#Tenor Api From Google Cloud - refer `gif-picker-react` documentation.
NEXT_PUBLIC_TENOR_API_KEY= < Tenor Api From Google Cloud >


# UploadThing Configuration
UPLOADTHING_SECRET=your_upload_thing_secret_key
UPLOADTHING_APP_ID=your_upload_thing_app_id
```

Feel free to reach out for any inquiries or contributions.

Happy tweeting! 🐦✨

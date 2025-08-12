# <p align="center">Bewear</p>

This is a modern e-commerce application built with Next.js, offering a robust and scalable platform for selling clothes, sneakers, and more.

## ✨ Features

- **Product Catalog:** Browse and search for products by category.
- **Product Variants:** Select different product variations (e.g., size, color).
- **Shopping Cart:** Add, remove, and update products in the cart.
- **Authentication:** User sign-up and sign-in with Google.
- **Responsive Design:** Fully responsive layout for a seamless experience on any device.

## 🚀 Technologies

This project is built with a modern tech stack, including:

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/), and [Lucide Icons](https://lucide.dev/)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest)
- **Database ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Authentication:** [Better Auth](https://better-auth.dev/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/)
- **Component Development:** [Storybook](https://storybook.js.org/)
- **Testing:** [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/)
- **Linting & Formatting:** [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- **Git Hooks:** [Husky](https://typicode.github.io/husky/)
- **Containerization:** [Docker](https://www.docker.com/)

## 📦 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/e-commerce.git
    cd e-commerce
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    # or
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variables:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
    # Add other environment variables from enviroment-example.env
    ```

    You can use the `enviroment-example.env` file as a template.

4.  **Start the database:**

    This project uses Docker to run a local PostgreSQL database.

    ```bash
    yarn docker:start
    ```

5.  **Run database migrations:**

    Apply the database schema to your local database.

    ```bash
    yarn drizzle
    ```

6.  **Seed the database:**

    Populate the database with initial data.

    ```bash
    yarn db:seed
    ```

### Running the Application

To start the development server, run:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

- `dev`: Starts the development server.
- `build`: Creates a production build.
- `start`: Starts the production server.
- `lint`: Lints the codebase using ESLint.
- `docker:start`: Starts the Docker container for the database.
- `docker:stop`: Stops the Docker container for the database.
- `drizzle`: Pushes the database schema changes.
- `drizzle:generate`: Generates SQL migration files.
- `drizzle:studio`: Opens the Drizzle Studio.
- `drizzle:migrate`: Applies pending migrations.
- `db:seed`: Seeds the database with initial data.
- `test`: Runs the test suite.
- `test:watch`: Runs the test suite in watch mode.
- `commit`: A utility script to help with conventional commits.
- `storybook`: Starts the Storybook development server.
- `build-storybook`: Builds the Storybook for deployment.

## 🏗️ Project Structure

The project structure is organized as follows:

```
.
├── src/
│   ├── actions/        # Server actions
│   ├── app/            # Next.js App Router pages and layouts
│   ├── components/     # Reusable UI components
│   ├── db/             # Drizzle ORM schema and seed scripts
│   ├── helpers/        # Helper functions
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Library and utility functions
│   └── providers/      # React context providers
├── drizzle/            # Drizzle ORM output
...
```

## 🔐 Authentication

Authentication is handled by [Better Auth](https://better-auth.dev/), which provides a simple and secure way to manage user authentication. The configuration can be found in `src/lib/auth.ts` and the API route in `src/app/api/auth/[...all]/route.ts`.

## 🧪 Testing

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) for testing. Test files are located alongside the files they are testing or in the `.jest` directory.

To run the tests, use the following command:

```bash
yarn test
```

## 🤝 Contributing

Contributions are welcome! Please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages.

To contribute:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`yarn commit`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

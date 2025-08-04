<h1 align="center">🚀 E-commerce 🚀</h1>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="Drizzle" src="https://img.shields.io/badge/Drizzle-C5F74F?logo=drizzle&logoColor=000" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img alt="Jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
</p>

## 📖 About The Project

This is an e-commerce project built with **Next.js 15**, featuring a modern and scalable architecture for an online store. The project comes pre-configured with a development toolset that ensures productivity, code quality, and a solid foundation for e-commerce features.

---

## ✨ Key Features

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Drizzle Orm](https://orm.drizzle.team/)
- **Containerization:** [Docker](https://www.docker.com/)
- **Testing:** [Jest](https://jestjs.io/) & [Testing Library](https://testing-library.com/)
- **Component Documentation:** [Storybook](https://storybook.js.org/)
- **Code Quality:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Standardized Commits:** [Commitizen](https://commitizen-tools.github.io/commitizen/), [Commitlint](https://commitlint.js.org/) & [Husky](https://typicode.github.io/husky/)

---

## 🌿 Branches

This project has multiple branches to showcase different database configurations:

- **`master`**: The main branch, configured with **Drizzle ORM**.
- **`Aleydon`**: This branch is configured with **Drizzle ORM**.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18 or higher)
- [Docker](https://www.docker.com/get-started)

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Aleydon/e-commerce.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd e-commerce
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Set up environment variables:**
   - Rename the `enviroment-example.env` file to `.env`.
   - Fill in the required environment variables in the `.env` file.

5. **Start the Docker environment:**
   - This command will build and start the PostgreSQL container.

   ```sh
   npm run docker:start
   ```

6. **Run the database migrations:**
   - This command will create the database tables based on your Drizzle schema.

   ```sh
   npm run drizzle:migrate
   ```

7. **Start the development server:**
   ```sh
   npm run dev
   ```

---

## 📜 Available Scripts

| Script             | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `dev`              | Starts the Next.js development server.                          |
| `build`            | Builds the application for production.                          |
| `start`            | Starts a production server.                                     |
| `lint`             | Runs ESLint to analyze and fix the code.                        |
| `docker:start`     | Starts the services defined in `docker-compose.yml`.            |
| `drizzle:migrate`  | Runs Drizzle migrations to update the database.                 |
| `drizzle:generate` | Generates the Drizzle based on your schema.                     |
| `drizzle:studio`   | Opens Drizzle Studio to view and edit your data.                |
| `test`             | Runs the unit and integration tests.                            |
| `test:watch`       | Runs the tests in watch mode.                                   |
| `commit`           | Starts the Commitizen assistant to create standardized commits. |
| `storybook`        | Starts Storybook to view and develop components.                |
| `build-storybook`  | Builds Storybook for production.                                |

---

## 🐳 Docker

The development environment uses Docker to manage the PostgreSQL database.

- **Start the container:**
  ```sh
  npm run docker:start
  ```
  This command will build and start the database container in the background.

---

## 💿 Drizzle

Drizzle is used as an ORM to interact with the database.

- **Apply migrations:**

  ```sh
  npm run drizzle:migrate
  ```

  Creates and applies migrations to the database based on `src/da/schema.ts`.

- **Generate Drizzle:**

  ```sh
  npm run drizzle:generate
  ```

  Generates or updates the Prisma Client whenever `src/db/schema.ts` is modified.

- **Open Drizzle Studio:**
  ```sh
  npm run drizzle:studio
  ```
  Opens a visual interface in the browser to view and manage the database data.

---

## 🧪 Testing

This project uses **Jest** and **Testing Library** for testing.

- To run the tests, execute:
  ```sh
  npm run test
  ```
- To run the tests in watch mode:
  ```sh
  npm run test:watch
  ```

A test example can be found in `src/app/page.spec.tsx`.

---

## 🎨 Storybook

Visualize and develop your components in isolation with **Storybook**.

- To start Storybook:
  ```sh
  npm run storybook
  ```

A story example can be found in `src/app/components/Text/text.stories.tsx`.

<p align="center">
  <br>
  <img width="1100" src="./assets/storybok_screen_shot.png" alt="storybook running">
  <br>
  <br>
</p>

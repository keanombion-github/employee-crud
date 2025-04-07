# Employee CRUD Application

A modern web application built with Laravel and React for managing employee records.

## Features

- Create, Read, Update, and Delete employee records
- Modern UI with responsive design
- Form validation
- Real-time updates
- RESTful API endpoints

## Tech Stack

- **Backend**: Laravel 10
- **Frontend**: React with TypeScript
- **Database**: SQLite
- **Styling**: Tailwind CSS

## Prerequisites

- PHP 8.1 or higher
- Node.js 16 or higher
- Composer
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/keanombion-github/employee-crud.git
cd employee-crud
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install JavaScript dependencies:
```bash
npm install
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Run migrations:
```bash
php artisan migrate
```

7. Start the development server:
```bash
php artisan serve
```

8. In a new terminal, start the Vite dev server:
```bash
npm run dev
```

## Usage

- Access the application at `http://localhost:8000`
- Use the form to add new employees
- Edit or delete existing employees using the respective buttons
- All changes are saved to the database in real-time

## API Endpoints

- `GET /api/employees` - List all employees
- `POST /api/employees` - Create a new employee
- `PUT /api/employees/{id}` - Update an employee
- `DELETE /api/employees/{id}` - Delete an employee

## License

This project is open-source and available under the [MIT License](LICENSE).

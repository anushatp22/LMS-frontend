A role-based Leave Management System built with .NET Web API, Angular, and SQL Server. Implements JWT authentication, employee onboarding, leave type management, leave balance logic, and leave application APIs.

Features
Authentication
• JWT-based login
• Role-based access: Admin & Employee
• First-login password reset
• Secure password hashing
Admin Features
• Create employees (no self-registration)
• Assign temporary password (email or manual sharing)
• Manage leave types (name + gender-based restrictions)
• Automatically assign initial leave balance on registration
• View employee leave history
Employee Features
• Login and change password
• View leave balance (per leave type)
• Apply for leave
• View applied leave status & history
Leave Management Logic
• LeaveType table (ID, Name, Gender restriction)
• LeaveBalance table (Allocated, Used, Year)
• Leave allocation on employee creation
• Yearly leave reset logic (on January 1st)
⸻
Tech Stack
Backend
• .NET 8 Web API
• C#
• Entity Framework Core
• SQL Server
Frontend
• Angular
• TypeScript
• HTML/CSS
Tools
• Visual Studio / VS Code
• Git & GitHub
• Postman

Backend (.NET API)
/Controllers
/Models
/DTOs
/Services
/Repositories
/Data
appsettings.json
Program.cs

Frontend (Angular)
/src
 /app
   /components
   /services
 index.html
 styles.css

# LMSUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

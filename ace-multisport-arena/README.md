# AceMultisportArena

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.24.

## Booking foundation

The booking screens, admin pages, and service contracts are a frontend scaffold. The turf picker uses illustrative slot states and an illustrative INR/hour figure. It does not reserve slots, create bookings, or collect payment. Auth and route guards only shape navigation; a backend must authenticate users and authorize every protected operation.

Set `apiBaseUrl` in `src/environments/environment.ts` and `environment.production.ts` when the API host is agreed. No credentials belong in these files. Service integration points are documented in `src/app/core/services/`.

Proposed backend endpoints:

- `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/turfs`, `GET /api/turfs/{id}/slots`, `POST /api/bookings`, `GET /api/bookings/mine`
- `GET /api/admin/bookings`, `POST /api/admin/bookings/reserve`, `POST /api/admin/slots/block`, `POST /api/admin/slots/unblock`
- `GET /api/admin/pricing`, `PUT /api/admin/pricing`, `GET /api/users`
- `POST /api/payments/create-order`, `POST /api/payments/verify`, `GET /api/payments/{id}`
- `POST /api/notifications/booking-confirmation`

The backend must own slot locking, price validation, Razorpay signature verification, notification credentials, and role/permission enforcement. These endpoints are proposals and are not called by the current UI.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Semic-Migration

Solid App which showcases the migration data of French, Belgian and Greek citizens in EU member states.

## Features

- Login with a WebId to access the ldes of France, Belgium and Greece.
- A user can get information of citizen registration/deregistration about their own citizens in other member states.
- Display of migratory information, according to the access control rules defined by every published member states's base registry.

## Running locally

1. Clone the repository.
2. Install the Node dependencies

   ```
   npm install --legacy-peer-deps
   ```

3. Start the application

   ```
   npm run start
   ```

## Application walkthrough

- Login with a WebId, which will be authorized using Solid OIDC.
- Select a country and from and to dates from which the user prefers to see the migration data of his citizens.

----

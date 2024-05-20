## Family App (A Geneology App)

Author: **Nfor Nde Nyambi**

### Tools used

- Next.js 14.2 Pages Router
- Typescript
- Tailwind CSS
- MySQL
- Prisma to connect to database

### How to run app

- Clone repo `git clone https://github.com/xinodeprinz/family-app.git`
- Run `npm install`
- Configure your MySQL database and paste the `DATABASE_URL` in the .env file

  Example: `DATABASE_URL="mysql://user:password@localhost:3306/db_name"`

- Run `npx prisma migrate dev` to automatically create the database table (users)
- Run `npx prisma generate`
- Finally, run `npm run dev` or build the app with `npm run build` and then run `npm start` to start the application.

#### _ENJOY!!_

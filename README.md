# SoftwareDevelopmentProj

# Note

## 1. `npm install` to install node packages if you newly cloned it from github

## 2. `npm run dev` to run the application, default URL is [3000](http://localhost:3000/)

## 3. `npm run seed` to seed static data for products and staffs. If you already run the application before, clear the database

## Default Super User for admin is `admin@brew4you.ca` and password is `welcome`. Must run `npm run seed` to acquire this account

# Naming Convention

## 1. All variable is camelCase, except for controller name in `app.server.routes.js` file

## 2. Model file is Singular, Ex User, Staff, Product, etc.

**OPTIONAl** I left my VSCode settings folder so everyone can have same coding style. If you feel inconvenience about this VSCode setting, just simply replace yours or delete the `.vscode` folder. If you want to use this, you need to install Prettier - Code formatter (11M+ downloaded).

If you have any other questions/concerns, post in in Microsoft Teams so all the team members can see it

Only create pull request into `develop` branch, `master` branch is stable - workable code. Please branch off from `develop` only.

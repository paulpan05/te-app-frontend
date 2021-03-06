# Triton Exchange - Frontend

The backend repository is located here: https://github.com/paulpan05/te-app-backend

![Triton Exchange](./src/assets/img/full-app-logo.svg)

## CI Status

![Integration testing](https://github.com/paulpan05/te-app-frontend/workflows/Integration%20testing/badge.svg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/2120977d-302b-4793-aa02-d4a6994b8011/deploy-status)](https://app.netlify.com/sites/triton-exchange/deploys)

## We are Team Pear

### Our Members

- Project Manager - Parth Shah
- Business Analyst - Dillen Padhiar
- Senior System Analyst - Neil Tengbumroong
- Software Architect - Amit Bar
- Software Development Lead - Paul Pan, Allan Tan
- Algorithm Specialist - Joachim Do
- Database Specialist - Sebastian Dogaru
- Quality Assurance Lead - Quylan Mac
- User Interface Specialist - Aarushi Shah

## Introduction

![Main Site](./mainsite.png)

Triton exchange is a web application that us, Team Pear, developed over the course of 10 weeks. This application aims to solve the issue of the lack of centralized and trustworthy online marketplaces for UC San Diego. By making a dedicated web app that is eqipped with UCSD Single Sign-On and user ratings, we hope to provide a place where the UCSD community can feel safe when shopping. Numerous other features, like reporting listings and saving listings, makes our app more advanced and attractive than traditional school online marketplaces.

## Login Credentials

Having access to UCSD Single Sign-On should be sufficient.

![Login](./login.png)

## Requirements

The web application can be run on Google Chrome, Firefox, and Safari. Other browsers have not been tested and are not garanteed to work, most notably Internet Explorer.

## Installation Instruction

There is no installation needed since it is a web application.

## How to Run

You can access the app by going to https://triton-exchange.netlify.app

## How to Test

- Do ```npm install``` to install dependencies for project. Make sure you have Node.js and NPM on your development environment.
- Copy ```.env.local.example``` file as ```.env.local``` in the same directory.
- Input the Firebase credentials in the ```.env.local``` file, ask Software Development Lead Paul Pan if you don't have it.
- Run ```npm start``` and go to http://localhost:3000 to test things out.
- Install ESLint and Prettier plugins on your Visual Studio Code to enable automatic syntax warning and correction.
- Run ```npm run lint``` to see what syntax errors you have.

Sample Lint Output:

```
> triton-exchange@0.1.0 lint /home/paulpan/GitRepos/te-app-frontend
> eslint ./src --ext .tsx --color


/home/paulpan/GitRepos/te-app-frontend/src/components/Listing/Listing.tsx
  76:9  error  Static HTML elements with event handlers require a role  jsx-a11y/no-static-element-interactions

✖ 1 problem (1 error, 0 warnings)
```

- Code will be tested and linted on GitHub prior to being automatically deployed from the master branch.

## Known Bugs

If a button is clicked twice when submitting, unexpected result can happen since two requests are made to the backend.

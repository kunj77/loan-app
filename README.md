# Loan App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It is created using MERN stack. The app folder contains frontend code and the backend folder contains backend code. 
This app using crypto-js to hash the password. 



## In order to run the whole app (without docker):
In /backend/database/constants.ts - Change `export const dbName: string = 'mongodb://database:27017/loanappdb';` to `export const dbName: string = 'mongodb://localhost:27017/loanappdb';`

### Start Backend Server

- Run `mongod` on a terminal
- Open another terminal and get inside the `backend` folder
- Run `npm install` to install required packages 
- Run `npm run dev`

Open API URL on [http://localhost:4000/users](http://localhost:4000/users) to view it in the browser.

### Run Frontend React App

- Get inside the `app` folder
- Run `npm install` to install required packages 
- Run `npm start`

Open API URL on [http://localhost:3000](http://localhost:3000) to view and run the app in the browser.

## In order to run the whole app (with docker):
- From the loan-app folder run `docker-compose up --build`

Open API URL on [http://localhost:3000](http://localhost:3000) directly or from the link in docker app to view and run the app in the browser.

# Food Order Web Application

This project is a simple web application for placing food orders. Users can fill out a form with the price, food name, and select a table, and the order will be displayed in a table corresponding to the selected table number. Orders can be submitted, deleted, and are stored both locally and remotely using a CRUD API.

## Features

- Submit food orders with price, food name, and table selection.
- Store orders locally in the browser's localStorage.
- Store orders remotely using a CRUD API.
- Delete orders from both local and remote storage.

## Setup

1. Clone the repository to your local machine.
2. Open `index.html` in a web browser.
3. Ensure an internet connection for remote storage using the CRUD API.

## Usage

1. Fill out the form with the price, food name, and select a table.
2. Click "Submit" to add the order.
3. To delete an order, click the "Delete" button next to the order in the table.

## Code Structure

- `index.html`: Contains the HTML structure of the food order form.
- `main.js`: Contains the JavaScript code for handling form submission, local storage, remote storage using a CRUD API, and dynamic table generation.

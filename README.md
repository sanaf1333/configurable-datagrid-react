# Configurable DataGrid Widget

This project is a configurable data grid widget built using ReactJS and TypeScript. The widget allows you to create a data grid with various columns and data types. The app generates a data table according to the columns and data types.

## How to Clone and Run the App

To clone and run the app locally, follow these steps:

1. Clone the repository from GitHub:

`git clone <repository_url>`


2. Navigate to the project directory:

`cd <project_directory>`


3. Install the dependencies:

`npm install`

4. Run the app:

`npm start`

The app will be running locally at `http://localhost:3000`.

## Details about the App

The datagrid widget can be configured with the following properties:

- **Columns Configuration**: Each column in the grid can be configured with a label, key, and data type. This allows you to specify the data for each column in the grid.

- **API and Data Parsing**: The widget supports fetching data from an API and parsing it for each column using JsonPath. The configuration should include the API endpoint and the key that will be used to calculate JSONPath expression to extract data for each column.

- **Responsiveness**: The data grid is responsive and adapts to different screen sizes. On larger screens, it displays all columns in a tabular format. On smaller screens (e.g., phones), it transforms into a list with a title and subtitle for each item. The columns to use for the title and subtitle are configurable in the grid settings.

## Example to Run

To test the code, you can use the following API as an example:

1. API Endpoint: https://us-central1-fir-apps-services.cloudfunctions.net/transactions

Configure the data grid to show the following columns:

```json
[
  { "label": "Name", "key": "name", "type": "string" },
  { "label": "Date", "key": "date", "type": "date" },
  { "label": "Category", "key": "category", "type": "string" },
  { "label": "Amount", "key": "amount", "type": "number" },
  { "label": "Created At", "key": "created_at", "type": "date" }
]```

2. API Endpoint: https://jsonplaceholder.typicode.com/posts

Configure the data grid to show the following columns:

```json
[
  { "label": "User ID", "key": "userId", "type": "number" },
  { "label": "Title", "key": "title", "type": "string" },
  { "label": "Body", "key": "body", "type": "string" }
]

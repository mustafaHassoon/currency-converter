# Currency Converter Application

A currency converter app built with React, enables users to convert amounts between various currencies using the latest exchange rates, as well as review the previous exchanges.

## Configuration

To run the application, follow these steps:

1. **Clone the Repository**:

   - If you haven't done so already, clone the repository to your local machine.

   ```bash
   git clone <repository-url>
   ```

2. **Endpoints**:

   - Ensure you have access to the API.
   - Set the API access key, repalce `ACCESS_KEY` value with you access key in **_services/ExchangeRateService.ts_**.

3. **Install Dependencies**:

   - Navigate to the project directory and run the following command:

   ```
   npm install
   ```

## Run

To start the application,in the project directory, run:

```
npm start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

to run the tests, execute this command in the root directory:

```
npm test
```

Launches the test runner in the interactive watch mode.

## Production

```
npm run build
```

Builds the app for production to the `build` folder.

## Project Structure

### src/

Contains the source code of the application.

- `components/`: Contains React components used in the application.
- `context/`: Contains the context and state management logic.
- `services/`: Contains services for fetching data from APIs.
- `App.tsx`: Main application component.
- `index.tsx`: Entry point of the application.
- `App.test.tsx`: Test cases for the `App` component.

## Technologies Used

- `React`: Front-end library for building user interfaces.
- `TypeScript`: Typed superset of JavaScript for type safety.
- `MUI`: UI component library for React.
- `Jest`: avaScript testing framework.

## Contributing

We welcome contributions to this project. To contribute:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes.
- Submit a pull request.

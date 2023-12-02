# Calculator

## Not another calculator?!
I initially started writing this calculator app to practise my frontend skills by recreating [a design by Fawaz Ahamed](https://dribbble.com/shots/20012393-Calculator-App-UI-Design). As the project developed I realised it was a perfect use case for the useContext and useReducer hooks, and there were some interesting challenges involved in dynamically resizing the mathematical expression and evaluating it as the user enters it, and creating an array of references to set the scroll position of lines in the History component. Handling the many edge cases in the calculator logic function has been a fascinating puzzle too. So in the end this project has given me some great practice in using TypeScript, accessing the DOM directly, and several React hooks.

## Project structure
The main App component is wrapped in three context providers, SettingsContextProvider, CalculatorContextProvider and HistoryContextProvider.

### Settings Context
The settings context manages two options held in state, the dark/light theme setting and the sound setting. It retrieves its initial state from localStorage, and incorporate a useEffect hook to save the settings to localStorage whenever they are changed. The theme setting is only used in App to give the `<main>` element a class of light or dark. A set of CSS variables is defined in App.module.css for each theme, which are used by all the other styles for the components within `<main>`. The sound setting is used by the Button components to determine whether the click sounds will be played.
export default function retrieveSettings(): SettingsStateType {
  const settingsState: SettingsStateType = {
    theme: "light",
    sound: "on",
  };

  const storedSettingsJSON = localStorage.getItem("settings");
  if (storedSettingsJSON) {
    const storedSettingsParsed = JSON.parse(storedSettingsJSON);
    const { storedTheme, storedSound } = storedSettingsParsed;
    if (
      (storedTheme === "light" || storedTheme === "dark") &&
      (storedSound === "on" || storedSound === "off")
    ) {
      settingsState.theme = storedTheme;
      settingsState.sound = storedSound;
    }
  }

  return settingsState;
}

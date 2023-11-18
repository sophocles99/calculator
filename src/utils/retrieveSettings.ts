export default function retrieveSettings(): SettingsStateType {
  const settingsState: SettingsStateType = {
    theme: "light",
    sound: "on",
  };

  const storedSettingsJSON = localStorage.getItem("settings");
  if (storedSettingsJSON) {
    const storedSettingsParsed = JSON.parse(storedSettingsJSON);
    const { theme, sound } = storedSettingsParsed;
    if (
      (theme === "light" || theme === "dark") &&
      (sound === "on" || sound === "off")
    ) {
      settingsState.theme = theme;
      settingsState.sound = sound;
    }
  }

  return settingsState;
}

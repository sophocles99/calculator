export default function storeHistory(expression: string) {
  console.log("storeHistory:", Date.now())
  let storedHistory = [];
  const storedHistoryJSON = localStorage.getItem("history");
  if (storedHistoryJSON) {
    storedHistory = JSON.parse(storedHistoryJSON);
  }
  console.log(expression)
  const newHistory = [...storedHistory, expression];
  localStorage.setItem("history", JSON.stringify(newHistory));
}

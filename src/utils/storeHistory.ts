export default function storeHistory([
  expression,
  answer,
]: PreviousExpressionType) {
  let storedHistory: PreviousExpressionType[] = [];
  const storedHistoryJSON = localStorage.getItem("history");
  if (storedHistoryJSON) {
    storedHistory = JSON.parse(storedHistoryJSON);
  }
  const newHistory: PreviousExpressionType[] = [...storedHistory, [expression, answer]];
  // const newHistory: PreviousExpressionType[] = []
  localStorage.setItem("history", JSON.stringify(newHistory));
}

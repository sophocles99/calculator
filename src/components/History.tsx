export default function History() {
  let storedHistory: string[] = [];
  const storedHistoryJSON = localStorage.getItem("history");
  if (storedHistoryJSON) {
    storedHistory = JSON.parse(storedHistoryJSON);
  }
  console.log(storedHistory)
  return (
    <div>
      {storedHistory.map((expression, index) => (
        <p key={index}>{expression}</p>
      ))}
    </div>
  );
}

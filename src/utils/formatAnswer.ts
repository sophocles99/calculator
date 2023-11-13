export default function formatAnswer(answer: string) {
  return parseFloat(answer).toPrecision(16).toString()
}
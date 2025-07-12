
interface HistoryMatchProps {
  number: number;
  result: string
}

function HistoryMatch({ number, result}: HistoryMatchProps) {
  return (
    <div className="flex justify-between">
        <span>Game {number}:</span>
        <span>{result}</span>
    </div>
  );
}

export default HistoryMatch;
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  // Достаем массив билетов из state (если его нет — будет пустой массив)
  const offers = location.state?.offers || [];

  return (
    <div>
      <h1>Результаты поиска</h1>
      <p>Найдено билетов: {offers.length}</p>

      {/* Массив offers уже доступен для дальнейшей верстки */}
    </div>
  );
};

export default Results;

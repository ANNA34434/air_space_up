import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const API_TOKEN = import.meta.env.VITE_TRAVELPAYOUTS_TOKEN;

export const useSearch = () => {
  const navigate = useNavigate();

  const [cities, setCites] = useState([]);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [passengerSelection, setPassengerSelection] = useState({
    serviceClass: "economy",
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const dialogRef = useRef(null);

  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);
  const [selectedFromId, setSelectedFromId] = useState(null);
  const [selectedToId, setSelectedToId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Используем прямой публичный URL Travelpayouts для городов
        const response = await fetch(
          "https://api.travelpayouts.com/data/ru/cities.json",
        );

        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status}`);
        }

        const data = await response.json();

        // 2. Aviasales возвращает массив городов напрямую, а не в data.data
        setCites(data);

        console.log("Загруженные города:", data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  const filterOne =
    cities?.filter((city) =>
      (city.name || "").toLowerCase().includes(queryFrom.toLowerCase()),
    ) || [];

  const filterTwo =
    cities?.filter((city) =>
      (city.name || "").toLowerCase().includes(queryTo.toLowerCase()),
    ) || [];

  const selectFrom = (city) => {
    setQueryFrom(city.name);
    setSelectedFromId(city.code);
    setOpenFrom(false);
  };

  const selectTo = (city) => {
    setQueryTo(city.name);
    setSelectedToId(city.code);
    setOpenTo(false);
  };

  const handleSwap = () => {
    setQueryFrom(queryTo);
    setQueryTo(queryFrom);
    setSelectedFromId(selectedToId);
    setSelectedToId(selectedFromId);
  };

  // Функция для даты вылета
  const handleStartChange = (date) => {
    setStartDay(date);
    // Если дата возврата уже выбрана, но она раньше новой даты вылета — сбрасываем возврат
    if (endDay && date > endDay) {
      setEndDay(null);
    }
  };

  // Функция для даты возврата
  const handleEndChange = (date) => {
    setEndDay(date);
  };

  const handleConfirmPassengerSelection = (selection) => {
    setPassengerSelection(selection);
  };

  const handleOpen = () => {
    setOpenDialog(true);
    // dialogRef.current.showModal();
  };
  const handleClose = (e) => {
    if (!e || e.target === e.currentTarget) {
      setOpenDialog(false);
    }
    // dialogRef.current.close();
  };
  useEffect(() => {
    if (!openDialog) return;

    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        setOpenDialog(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDialog]);

  const increment = (passenger) => {
    setPassengerSelection((prev) => {
      return {
        ...prev,
        [passenger]: prev[passenger] + 1,
      };
    });
  };

  const decrement = (passenger) => {
    setPassengerSelection((prev) => {
      return {
        ...prev,
        [passenger]: Math.max(0, prev[passenger] - 1),
      };
    });
  };

  const totalPassenger =
    passengerSelection.adults +
    passengerSelection.children +
    passengerSelection.infants;

  const searchTicket = async (e) => {
    e.preventDefault();

    const formattedStart = startDay ? format(startDay, "yyyy-MM") : "";

    try {
      // Делаем GET запрос к нашему бэкенду
      const response = await fetch(
        `http://localhost:5000/api/search-tickets?origin=${selectedFromId}&destination=${selectedToId}&depart_date=${formattedStart}`,
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error("Ошибка от API:", result);
        return;
      }

      // В ответе Aviasales билеты лежат в объекте под ключом destination
      const destinationData = result.data[selectedToId] || {};
      const offers = Object.values(destinationData);

      navigate("/result", { state: { offers } });
      console.log("Найденные билеты:", offers);
    } catch (error) {
      console.error("Ошибка соединения с сервером:", error);
    }
  };
  return {
    openFrom,
    setOpenFrom,
    openTo,
    setOpenTo,
    queryFrom,
    setQueryFrom,
    queryTo,
    setQueryTo,
    filterOne,
    filterTwo,
    handleSwap,
    selectFrom,
    selectTo,
    startDay,
    setStartDay,
    endDay,
    setEndDay,
    // handleDayts,
    passengerSelection,
    setPassengerSelection,
    handleConfirmPassengerSelection,
    handleOpen,
    handleClose,
    openDialog,
    setOpenDialog,
    dialogRef,
    decrement,
    increment,
    totalPassenger,
    fromFocused,
    setFromFocused,
    toFocused,
    setToFocused,
    handleStartChange,
    handleEndChange,

    searchTicket,
  };
};

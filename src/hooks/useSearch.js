import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const KEY = import.meta.env.VITE_DUFFEL_TOKEN;

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
        const response = await fetch("/duffel-api/air/cities", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${KEY}`,
            "Duffel-Version": "v2",
            Accept: "application/json",
            "Accept-Language": "ru",
          },
        });
        const data = await response.json();
        setCites(data.data);

        console.log(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  const filterOne = cities.filter((city) =>
    (city.name || "").toLowerCase().includes(queryFrom.toLowerCase()),
  );
  const filterTwo = cities.filter((city) =>
    (city.name || "").toLowerCase().includes(queryTo.toLowerCase()),
  );

  const selectFrom = (city) => {
    setQueryFrom(city.name);
    setSelectedFromId(city.iata_code);
    setOpenFrom(false);
  };

  const selectTo = (city) => {
    setQueryTo(city.name);
    setSelectedToId(city.iata_code);
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

  // Добавили async перед (e)
  const searchTicket = async (e) => {
    e.preventDefault();

    const classCabin = {
      economy: "economy",
      "premium economy": "premium_economy",
      business: "business",
      first: "first",
    };

    const mappedCabinClass = classCabin[passengerSelection.serviceClass];
    const formattedStart = startDay ? format(startDay, "yyyy-MM-dd") : null;
    const formattedEnd = endDay ? format(endDay, "yyyy-MM-dd") : null;

    const passengers = [
      ...Array.from({ length: passengerSelection.adults }, () => ({
        type: "adult",
      })),
      ...Array.from({ length: passengerSelection.children }, () => ({
        type: "child",
      })),
      ...Array.from({ length: passengerSelection.infants }, () => ({
        type: "infant_without_seat",
      })),
    ];

    const slices = [
      {
        origin: selectedFromId,
        destination: selectedToId,
        departure_date: formattedStart,
      },
    ];

    if (formattedEnd) {
      slices.push({
        origin: selectedToId,
        destination: selectedFromId,
        departure_date: formattedEnd,
      });
    }

    const payload = {
      data: {
        slices: slices,
        passengers: passengers,
        cabin_class: mappedCabinClass,
      },
    };

    try {
      const response = await fetch("http://localhost:5000/api/search-tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Ошибка от API:", result);
        return;
      }
      navigate("/result", { state: { offers: result.data.offers } });
      console.log("Успешный ответ от Duffel:", result.data);
      console.log("Найденные рейсы (Offers):", result.data.offers);
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

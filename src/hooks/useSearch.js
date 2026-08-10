import { useState, useEffect, useRef } from "react";

const KEY = import.meta.env.VITE_DUFFEL_TOKEN;

export const useSearch = () => {
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

  const selectFrom = (cityName) => {
    setQueryFrom(cityName);
    setOpenFrom(false);
  };

  const selectTo = (cityName) => {
    setQueryTo(cityName);
    setOpenTo(false);
  };

  const handleSwap = () => {
    setQueryFrom(queryTo);
    setQueryTo(queryFrom);
  };

  const handleDayts = (dates) => {
    const [start, end] = dates;
    setEndDay(end);
    setStartDay(start);
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
      setOpen(false);
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
    handleDayts,
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
  };
};

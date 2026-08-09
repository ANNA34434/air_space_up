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

  // const dialogRef = useRef(null);

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
  };
};

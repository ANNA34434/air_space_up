import { data, Link } from "react-router-dom";
import reverseIcon from "../assets/reverseIcon.jpg";
import { useRef, useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // ← стили библиотеки
import { ru } from "date-fns/locale";
import searchIcon from "../assets/searchIcon.png";

const KEY = import.meta.env.VITE_DUFFEL_TOKEN;
function Home() {
  // const [startDate, endDate] = dateRange;

  const [cities, setCites] = useState([]);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");

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

  const handleSwap = () => {
    setQueryFrom(queryTo);
    setQueryTo(queryFrom);
  };

  const dialogRef = useRef(null);

  return (
    <div className="flex flex-col bg-linear-to-t from-primary-after to-primary h-96 w-full">
      <div className=" flex flex-col items-center justify-center h-96 w-full gap-10">
        <div className="flex">
          <h1 className="text-4xl text-text-on-dark">Find your next journey</h1>
        </div>
        <form className="flex flex-row items-center font-serif  px-6 gap-3 h-33 w-5xl bg-surface-container rounded-xl ">
          <div className="flex flex-col relative h-14 w-44">
            <input
              className="border-2 border-outline placeholder-text-secondary rounded-lg h-14 w-full pl-4 pr-4"
              type="text"
              value={queryFrom}
              placeholder="Where from"
              onBlur={() => setTimeout(() => setOpenFrom(false), 200)}
              onFocus={() => setOpenFrom(true)}
              onChange={(e) => {
                setQueryFrom(e.target.value);
                setOpenFrom(true);
              }}
            />
            {openFrom && queryFrom && filterOne.length > 0 && (
              <ul className="absolute mt-14 bg-surface-container border-2 border-outline rounded-lg w-full max-h-48 overflow-y-auto z-10">
                {filterOne.map((city) => (
                  <li
                    onMouseDown={() => {
                      setQueryFrom(city.name);
                      setOpenFrom(false);
                    }}
                    key={city.id}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Кнопка для смены направления поиска */}
          <button
            onClick={handleSwap}
            type="button"
            className="flex items-center justify-center h-10 w-10 bg-surface-container border-2 border-outline rounded-full z-20 -mx-5"
          >
            <img
              className="object-contain h-6 w-6"
              src={reverseIcon}
              alt="strelka"
            />
          </button>

          {/* Билеты в другую сторону */}
          <div className="flex flex-col relative h-14 w-44 mr-15 ">
            <input
              className="border-2 border-outline rounded-lg placeholder-text-secondary  h-14 w-full pl-4 pr-4"
              value={queryTo}
              onBlur={() => setTimeout(() => setOpenTo(false), 200)}
              onFocus={() => setOpenTo(true)}
              onChange={(e) => {
                setQueryTo(e.target.value);
                setOpenTo(true);
              }}
              type="text"
              placeholder="Where to"
            />
            {openTo && queryTo && filterTwo.length > 0 && (
              <ul className="absolute mt-14 bg-surface-container border-2 border-outline rounded-lg w-full max-h-48 overflow-y-auto z-10">
                {filterTwo.map((city) => (
                  <li
                    onMouseDown={() => {
                      setQueryTo(city.name);
                      setOpenTo(false);
                    }}
                    key={city.id}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Кнопка для выбора даты */}
          <div className="flex items-center h-14 w-auto">
            <DatePicker
              className="border-2 border-outline rounded-lg h-14 w-57 pl-4 pr-4 placeholder-text-secondary"
              selectsRange
              locale={ru}
              startDate={null}
              endDate={null}
              placeholderText="Departure and return dates"
              dateFormat="dd.MM.yyyy"
              minDate={new Date()}
              selected={null}
              monthsShown={2}
            />
          </div>

          {/* Кнопка для выбора пассажиров и класса */}
          <div className="flex flex-col gap-1 relative h-14 w-56  ">
            <div className="flex items-center h-14 w-auto border-2 border-outline bg-surface-container rounded-lg pl-4 pr-4">
              <button>
                <span className="bg-surface-container text-text-secondary">
                  Passengers and class
                </span>
                <img src="" alt="" />
                {/* <span className="bg-surface-container text-text-secondary">
                  1 Adult, Economy
                </span> */}
              </button>
            </div>

            {/* Модальное окно для выбора пассажиров и класса */}
            <dialog>
              <p>Passengers and class</p>
              <select name="" id="">
                <option value="">Economy</option>
                <option value="">Comfort</option>
                <option value="">Business</option>
                <option value="">First Class</option>
              </select>
              <div>
                <p>Adults (from 12 years)</p>
                <div>
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
              </div>
              <div>
                <p>Children (from 0 to 12 years)</p>
                <div>
                  <button>-</button>
                  <span>0</span>
                  <button>+</button>
                </div>
              </div>
              <div>
                <p>Infants (up to 2 years)</p>
                <div>
                  <button>-</button>
                  <span>0</span>
                  <button>+</button>
                </div>
              </div>
            </dialog>
          </div>

          {/* Кнопка поиска */}
          <div className="flex items-center h-14 w-auto ">
            <button className="h-20 w-14 ">
              <img
                className="h-15 w-14 rounded-lg"
                src={searchIcon}
                alt="searchBilet"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Home;

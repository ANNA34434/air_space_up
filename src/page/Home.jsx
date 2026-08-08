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
        <form className="flex flex-row items-center justify-between gap-1 h-33 w-6xl bg-surface-container rounded-xl ">
          <input
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
            <ul>
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

          <button>
            <img
              onClick={handleSwap}
              className="object-contain h-8 w-8"
              src={reverseIcon}
              alt="strelka"
            />
          </button>

          <input
            value={queryTo}
            onBlur={() => setTimeout(() => setOpenTo(false), 200)}
            onFocus={() => setOpenTo(true)}
            onChange={(e) => {
              setQueryTo(e.target.value);
              setOpenTo(true);
            }}
            type="text"
            placeholder="Where"
          />
          {openTo && queryTo && filterTwo.length > 0 && (
            <ul>
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

          <div className="">
            <DatePicker
              selectsRange
              locale={ru}
              startDate={null}
              endDate={null}
              placeholderText="Вылет-Прилет"
              dateFormat="dd.MM.yyyy"
              minDate={new Date()}
              selected={null}
              monthsShown={2}
            />
          </div>
          <div>
            <p>Пассажиры и класс</p>

            <div>
              <img src="" alt="" />
              <span>1 Взрослый, Эконом</span>
            </div>
          </div>
          <dialog>
            <p>Пассажиры и класс</p>
            <select name="" id="">
              <option value="">Эконом-класс</option>
              <option value="">Комфорт-класс</option>
              <option value="">Бизнес-класс</option>
              <option value="">Первый класс</option>
            </select>
            <div>
              <p>Взрослые (от 12 лет)</p>
              <div>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>
            <div>
              <p>Дети (от 0 до 12 лет)</p>
              <div>
                <button>-</button>
                <span>0</span>
                <button>+</button>
              </div>
            </div>
            <div>
              <p>Младенцы (до 2 лет)</p>
              <div>
                <button>-</button>
                <span>0</span>
                <button>+</button>
              </div>
            </div>
          </dialog>
          <button>
            <img
              className="w-10 h-10 object-contain"
              src={searchIcon}
              alt="searchBilet"
            />
          </button>
        </form>
      </div>
    </div>
  );
}
export default Home;

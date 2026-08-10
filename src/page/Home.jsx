import { data, Link } from "react-router-dom";
import reverseIcon from "../assets/reverseIcon.jpg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // ← стили библиотеки
import { ru } from "date-fns/locale";
import searchIcon from "../assets/searchIcon.png";
import { useSearch } from "../hooks/useSearch";
import { SearchForm } from "../components/Search/SearchForm";

function Home() {
  // const [startDate, endDate] = dateRange;
  const {
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
  } = useSearch();

  return (
    <div className="flex flex-col bg-linear-to-t from-primary-after to-primary h-96 w-full">
      <div className=" flex flex-col items-center justify-center h-96 w-full gap-10">
        <div className="flex">
          <h1 className="text-4xl text-text-on-dark">Find your next journey</h1>
        </div>

        <form className="flex flex-row items-center font-serif  px-6 gap-3 h-33 w-5xl bg-surface-container rounded-xl ">
          <SearchForm
            value={queryFrom}
            placeholder="Where from"
            isOpen={openFrom}
            suggestions={filterOne}
            onChange={(e) => {
              setQueryFrom(e.target.value);
              setOpenFrom(true);
            }}
            onFocus={() => setOpenFrom(true)}
            onBlur={() => setTimeout(() => setOpenFrom(false), 200)}
            onSelect={selectFrom}
          />

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
          <SearchForm
            value={queryTo}
            placeholder="Where to"
            isOpen={openTo}
            suggestions={filterTwo}
            onChange={(e) => {
              setQueryTo(e.target.value);
              setOpenTo(true);
            }}
            onFocus={() => setOpenTo(true)}
            onBlur={() => setTimeout(() => setOpenTo(false), 200)}
            onSelect={selectTo}
          />

          {/* Кнопка для выбора даты */}
          <div className="flex items-center h-14 w-auto">
            <DatePicker
              startDate={startDay}
              endDate={endDay}
              onChange={handleDayts}
              className="border-2 border-outline rounded-lg h-14 w-57 pl-4 pr-4 placeholder-text-secondary"
              selectsRange
              locale={ru}
              placeholderText="Departure and return dates"
              dateFormat="dd.MM.yyyy"
              minDate={new Date()}
              // selected={null}
              monthsShown={2}
            />
          </div>

          {/* Кнопка для выбора пассажиров и класса */}
          <div className="flex flex-col gap-1 relative h-14 w-60  ">
            <div className="flex items-center h-14 w-auto border-2 border-outline bg-surface-container rounded-lg pl-4 pr-4">
              <button
                type="button"
                onClick={handleOpen}
                className="h-14 w-auto"
              >
                <span className="bg-surface-container text-text-secondary ">
                  Passengers and class
                </span>

                <span className="bg-surface-container text-text-secondary">
                  {totalPassenger} Passenger{totalPassenger > 1 ? "s" : ""},{" "}
                  {passengerSelection.serviceClass}
                </span>
              </button>
            </div>

            {/* Модальное окно для выбора пассажиров и класса */}

            {openDialog && (
              <dialog open ref={dialogRef} className="absolute z-50 p-4">
                <p>Passengers and class</p>
                <select
                  value={passengerSelection.serviceClass}
                  onChange={(e) =>
                    setPassengerSelection((prev) => ({
                      ...prev,
                      serviceClass: e.target.value,
                    }))
                  }
                >
                  <option value="economy">Economy</option>
                  <option value="comfort">Comfort</option>
                  <option value="business">Business</option>
                  <option value="firstClass">First Class</option>
                </select>
                <div>
                  <p>Adults (from 12 years)</p>
                  <div>
                    <button type="button" onClick={() => decrement("adults")}>
                      -
                    </button>
                    <span>{passengerSelection.adults}</span>
                    <button type="button" onClick={() => increment("adults")}>
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p>Children (from 0 to 12 years)</p>
                  <div>
                    <button type="button" onClick={() => decrement("children")}>
                      -
                    </button>
                    <span>{passengerSelection.children}</span>
                    <button type="button" onClick={() => increment("children")}>
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p>Infants (up to 2 years)</p>
                  <div>
                    <button type="button" onClick={() => decrement("infants")}>
                      -
                    </button>
                    <span>{passengerSelection.infants}</span>
                    <button type="button" onClick={() => increment("infants")}>
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => handleClose()}>Закрыть</button>
              </dialog>
            )}
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

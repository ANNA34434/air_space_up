import { data, Link } from "react-router-dom";
import reverseIcon from "../assets/reverseIcon.jpg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // ← стили библиотеки
import { ru } from "date-fns/locale";
import searchIcon from "../assets/searchIcon.png";
import { useSearch } from "../hooks/useSearch";
import { SearchForm } from "../components/Search/SearchForm";
import { PopularDestinations } from "../components/Search/PopularDestinations";
import { RangeDateInput } from "../components/Search/SearchForm";

import icomDate from "../assets/icomDate.webp";
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

    handleDestinations,
    originInputRef,
  } = useSearch();

  return (
    <div>
      <div className="flex flex-col bg-linear-to-t from-primary-after to-primary h-96 w-full">
        <div className=" flex flex-col items-center justify-center h-96 w-full gap-10">
          <div className="flex">
            <h1 className="text-4xl text-text-on-dark">
              Find your next journey
            </h1>
          </div>

          <form
            onSubmit={searchTicket}
            className="flex flex-row relative items-center font-serif  px-6 gap-3 h-33 w-5xl bg-surface-container rounded-xl "
          >
            <SearchForm
              ref={originInputRef}
              value={queryFrom}
              isFocused={fromFocused}
              label="Where from"
              isOpen={openFrom}
              suggestions={filterOne}
              onChange={(e) => {
                setQueryFrom(e.target.value);
                setOpenFrom(true);
              }}
              onFocus={() => {
                setOpenFrom(true);
                setFromFocused(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setOpenFrom(false);
                  setFromFocused(false);
                }, 200);
              }}
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
              isFocused={toFocused}
              label="Where to"
              isOpen={openTo}
              suggestions={filterTwo}
              onChange={(e) => {
                setQueryTo(e.target.value);
                setOpenTo(true);
              }}
              onFocus={() => {
                setOpenTo(true);
                setToFocused(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setOpenTo(false);
                  setToFocused(false);
                }, 200);
              }}
              onSelect={selectTo}
            />

            {/* Кнопка для выбора даты */}
            <div className="flex items-center gap-3">
              {/* 1. Вылет (Туда) */}
              <div className="flex items-center h-14 w-40 relative">
                <img
                  className="absolute h-8 w-8 object-contain"
                  src={icomDate}
                  alt="Date"
                />

                <DatePicker
                  onChange={(date) => {
                    handleStartChange(date);
                    clearError("date");
                  }}
                  selected={startDay}
                  selectsStart
                  startDate={startDay}
                  endDate={endDay}
                  minDate={new Date()}
                  locale={ru}
                  placeholderText="Outbound"
                  dateFormat="yyyy-MM-dd"
                  monthsShown={2}
                  className="border-2 border-outline rounded-lg h-14 w-40 pl-8 pr-4 placeholder-text-secondary"
                  customInput={<RangeDateInput />}
                  calendarClassName="!flex !flex-row"
                />
              </div>

              {/* 2. Возврат (Обратно) */}
              <div className="flex items-center h-14 w-40 relative">
                <img
                  className="absolute h-8 w-8 object-contain"
                  src={icomDate}
                  alt="Date"
                />

                <DatePicker
                  selected={endDay}
                  onChange={handleEndChange}
                  selectsEnd
                  startDate={startDay}
                  endDate={endDay}
                  minDate={startDay || new Date()}
                  locale={ru}
                  placeholderText="Return"
                  dateFormat="yyyy-MM-dd"
                  monthsShown={2}
                  className="border-2 border-outline rounded-lg h-14 w-40 pl-8 pr-4 placeholder-text-secondary"
                  customInput={<RangeDateInput />}
                  calendarClassName="!flex !flex-row"
                />
              </div>
            </div>

            {/* Кнопка для выбора пассажиров и класса */}
            <div className="flex flex-col gap-1 relative h-14 w-30">
              <div className="flex flex-col gap-1 relative h-14 w-55 ">
                <button
                  type="button"
                  onClick={handleOpen}
                  className="flex flex-col justify-center items-start gap-0.5 h-14 w-full px-4 rounded-lg  bg-surface-container border-2 border-outline focus:outline-none focus:border-black focus:ring-0.5 focus:ring-black"
                >
                  <span className="block text-text-secondary truncate">
                    Passengers and class
                  </span>
                  <span className="block text-black truncate">
                    {totalPassenger} Passenger{totalPassenger > 1 ? "s" : ""},{" "}
                    {passengerSelection.serviceClass}
                  </span>
                </button>
              </div>

              {/* Модальное окно для выбора пассажиров и класса */}
              {openDialog && (
                <dialog
                  open
                  ref={dialogRef}
                  className="absolute left-27.5 -translate-x-1/2 z-50 border-2 border-outline placeholder-text-secondary rounded-lg max-h-70 w-69 overflow-y-auto mt-16.5 px-4 "
                >
                  <p className="text-xl mt-2 mb-2">Service class</p>
                  <select
                    className="border-2 rounded-lg border-outline h-9 w-28 mb-5"
                    value={passengerSelection.serviceClass}
                    onChange={(e) =>
                      setPassengerSelection((prev) => ({
                        ...prev,
                        serviceClass: e.target.value,
                      }))
                    }
                  >
                    <option value="economy">economy</option>
                    <option value="premium economy">premium economy</option>
                    <option value="business">business</option>
                    <option value="first">first</option>
                  </select>
                  <hr className="border-t border-outline  mb-2 -mt-2" />
                  <div className="flex flex-col gap-4">
                    <p className="text-xl">Passengers</p>
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex flex-col">
                        <p className="text-text-primary">Adults</p>
                        <p className="text-text-secondary text-sm">
                          (from 12 years)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="h-8 w-8 border-2 border-on-secondary-container rounded-lg flex items-center justify-center"
                          type="button"
                          onClick={() => decrement("adults")}
                        >
                          −
                        </button>
                        <span className="w-6 text-center">
                          {passengerSelection.adults}
                        </span>
                        <button
                          className="h-8 w-8 border-2 border-on-secondary-container rounded-lg flex items-center justify-center"
                          type="button"
                          onClick={() => increment("adults")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex flex-col">
                        <p className="text-text-primary">Children</p>
                        <p className="text-text-secondary text-sm">
                          (from 0 to 12 years)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="h-8 w-8 border-2 border-on-secondary-container rounded-lg flex items-center justify-center"
                          type="button"
                          onClick={() => decrement("children")}
                        >
                          −
                        </button>
                        <span className="w-6 text-center">
                          {passengerSelection.children}
                        </span>
                        <button
                          className="h-8 w-8 border-2 border-on-secondary-container rounded-lg flex items-center justify-center"
                          type="button"
                          onClick={() => increment("children")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex justify-between items-center gap-2 ">
                      <div className="flex flex-col">
                        <p className="text-text-primary">Infants</p>
                        <p className="text-text-secondary text-sm">
                          (up to 2 years)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="h-8 w-8 border-2 border-on-secondary-container rounded-lg flex items-center justify-center"
                          type="button"
                          onClick={() => decrement("infants")}
                        >
                          −
                        </button>
                        <span className="w-6 text-center">
                          {passengerSelection.infants}
                        </span>
                        <div className="relative group inline-block">
                          <button
                            className="h-8 w-8 border-2 border-on-secondary-container rounded-lg flex items-center justify-center"
                            type="button"
                            onClick={() => increment("infants")}
                            disabled={
                              passengerSelection.infants >=
                              passengerSelection.adults
                            }
                          >
                            +
                          </button>
                          {passengerSelection.infants >=
                            passengerSelection.adults && (
                            <div
                              className="absolute bottom-full -left-17 -translate-x-1/2 mb-2 
                    hidden group-hover:block whitespace-nowrap z-50
                    bg-black/70 text-white text-xs rounded px-2 py-1"
                            >
                              There are no more babies than adults.
                              <div
                                className="absolute top-full left-48.5 -translate-x-1/2 
                      border-4 border-transparent border-t-black/70"
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className=" -ml-2 mt-3 mb-2 border-2 h-7 w-18 rounded-2xl text-white bg-primary-hover hover:bg-primary-after after:bg-primary-hover"
                    onClick={() => handleClose()}
                  >
                    Закрыть
                  </button>
                </dialog>
              )}
            </div>

            {/* Кнопка поиска */}

            <div className="flex items-center h-14 w-14 ml-30">
              <button type="submit" className="h-20 w-14">
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
      <PopularDestinations onSelectDestination={handleDestinations} />
    </div>
  );
}
export default Home;

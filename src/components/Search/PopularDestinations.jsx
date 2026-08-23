import { Link } from "react-router-dom";
import GreciaPhoto from "../../assets/GreciaPhoto.jpg";
import japanPhoto from "../../assets/japanPhoto.jpg";
import rimPhoto from "../../assets/rimPhoto.jpg";
import parisPhoto from "../../assets/parisPhoto.png";
export const PopularDestinations = ({ onSelectDestination }) => {
  return (
    <div className="p-5">
      <h2 className="font-bold text-xl">Popular near you</h2>
      <p>Specially selected destinations for your next vacation.</p>

      {/* Главный контейнер сетки */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 items-stretch">
        {/* Большая карточка (Греция) */}
        <button
          onClick={() => onSelectDestination("Греция")}
          className="relative block rounded-xl overflow-hidden group h-full min-h-[380px] w-full"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            src={GreciaPhoto}
            alt="Greece"
          />
          <span className="flex flex-col items-start absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent w-full pointer-events-none">
            <p className="font-bold text-xl">Greece, Athens</p>
            <p className="text-sm opacity-90">Flight from $420</p>
          </span>
        </button>

        {/* Правый блок с 3 карточками */}
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onSelectDestination("Токио")}
            className="relative block rounded-xl overflow-hidden group h-full w-full"
          >
            <img
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              src={japanPhoto}
              alt="Japan"
            />
            <span className="flex flex-col items-start absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent w-full">
              <p className="font-bold">Japan, Tokyo</p>
              <p className="text-sm">Flight from $850</p>
            </span>
          </button>

          {/* Нижние две (Рим и Париж) */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onSelectDestination("Рим")}
              className="relative block rounded-xl overflow-hidden group h-full w-full"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                src={rimPhoto}
                alt="Rome"
              />
              <span className=" flex flex-col items-start absolute bottom-0 left-0 p-3 text-white bg-gradient-to-t from-black/70 to-transparent w-full">
                <p className="font-bold text-sm">Italy, Rome</p>
                <p className="text-xs">Flight from $290</p>
              </span>
            </button>

            <button
              onClick={() => onSelectDestination("Париж")}
              className="relative block rounded-xl overflow-hidden group h-full w-full"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                src={parisPhoto}
                alt="Paris"
              />
              <span className="flex flex-col items-start absolute bottom-0 left-0 p-3 text-white bg-gradient-to-t from-black/70 to-transparent w-full">
                <p className="font-bold text-sm">France, Paris</p>
                <p className="text-xs">Flight from $310</p>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

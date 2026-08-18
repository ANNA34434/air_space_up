import { Link } from "react-router-dom";
import GreciaPhoto from "../../assets/GreciaPhoto.jpg";
import japanPhoto from "../../assets/japanPhoto.jpg";
import rimPhoto from "../../assets/rimPhoto.jpg";
import parisPhoto from "../../assets/parisPhoto.png";
export const PopularDestinations = () => {
  return (
    <div className="p-5">
      <h2 className="font-bold text-xl">Popular near you</h2>
      <p>Specially selected destinations for your next vacation.</p>

      {/* Главный контейнер сетки */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 items-stretch">
        {/* Большая карточка (Греция) */}
        <Link
          className="relative block rounded-xl overflow-hidden group h-full min-h-[380px] w-full"
          to="/result"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            src={GreciaPhoto}
            alt="Greece"
          />
          <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent w-full pointer-events-none">
            <p className="font-bold text-xl">Greece, Athens</p>
            <p className="text-sm opacity-90">Flight from $420</p>
          </div>
        </Link>

        {/* Правый блок с 3 карточками */}
        <div className="grid grid-cols-1 gap-4">
          {/* Токио (Верхняя правая) */}
          <Link
            className="relative block rounded-xl overflow-hidden group h-full w-full"
            to="/result"
          >
            <img
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              src={japanPhoto}
              alt="Japan"
            />
            <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent w-full">
              <p className="font-bold">Japan, Tokyo</p>
              <p className="text-sm">Flight from $850</p>
            </div>
          </Link>

          {/* Нижние две (Рим и Париж) */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              className="relative block rounded-xl overflow-hidden group h-full w-full"
              to="/result"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                src={rimPhoto}
                alt="Rome"
              />
              <div className="absolute bottom-0 left-0 p-3 text-white bg-gradient-to-t from-black/70 to-transparent w-full">
                <p className="font-bold text-sm">Italy, Rome</p>
                <p className="text-xs">Flight from $290</p>
              </div>
            </Link>

            <Link
              className="relative block rounded-xl overflow-hidden group h-full w-full"
              to="/result"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                src={parisPhoto}
                alt="Paris"
              />
              <div className="absolute bottom-0 left-0 p-3 text-white bg-gradient-to-t from-black/70 to-transparent w-full">
                <p className="font-bold text-sm">France, Paris</p>
                <p className="text-xs">Flight from $310</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

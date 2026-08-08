import { Link } from "react-router-dom";
import maxIcon from "../../assets/maxIcon.png";
import IconVk from "../../assets/IconVk.webp";

function Footer() {
  return (
    <footer className="bg-primary h-48 w-full">
      <div className="flex items-start justify-between ml-5 ">
        <div className="h-48 w-96 mt-3">
          <h1 className="text-white mb-4 font-bold">AirSpaceUP</h1>
          <p className="text-white text-justify text-sm">
            Ваш надежный помощник в мире путешествий. Удобное бронирование и
            круглосуточная поддержка. Исследуйте мир с уверенностью.
          </p>
        </div>
        <div className="h-48 w-40 flex flex-col mt-3">
          <h3 className="text-white mb-4">Компания</h3>
          <Link className="text-white text-sm mb-1" to="#">
            О AirSpaceUP
          </Link>
          <Link className="text-white text-sm" to="#">
            Услуги
          </Link>
        </div>
        <div className="flex flex-col mt-3">
          <h3 className="text-white mb-4 ">Поддержка</h3>
          <Link className="text-white text-sm mb-1" to="#">
            Служба поддержки
          </Link>
          <Link className="text-white text-sm" to="#">
            Условия использования
          </Link>
        </div>
        <div className="flex flex-col mt-3">
          <h3 className="text-white mb-4">Мы в соцсетях</h3>
          <div className="flex items-center">
            {" "}
            <img className="h-9 w-9 object-contain" src={maxIcon} alt="max" />
            <img className="h-9 w-9 object-contain" src={IconVk} alt="vk" />
          </div>
        </div>
        <div className="flex mr-2 mt-35 ">
          <span className="text-surface-dim mr-5">
            &copy; 2026 AirSpaceUp. Все права защищены.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import { Link } from "react-router-dom";
import maxIcon from "../../assets/maxIcon.png";
import IconVk from "../../assets/IconVk.webp";

function Footer() {
  return (
    <footer className="bg-primary h-48 w-full font-serif">
      <div className="flex items-start justify-between ml-5 ">
        <div className="h-48 w-96 mt-3">
          <h1 className="text-white mb-4 font-bold">AirSpaceUP</h1>
          <p className="text-white text-justify text-sm">
            Your reliable assistant in the world of travel. Convenient booking
            and 24/7 support. Explore the world with confidence.
          </p>
        </div>
        <div className="h-48 w-40 flex flex-col mt-3">
          <h3 className="text-white mb-4">Company</h3>
          <Link className="text-white text-sm mb-1" to="#">
            About AirSpaceUP
          </Link>
          <Link className="text-white text-sm" to="#">
            Services
          </Link>
        </div>
        <div className="flex flex-col mt-3">
          <h3 className="text-white mb-4 ">Support</h3>
          <Link className="text-white text-sm mb-1" to="#">
            Customer Support
          </Link>
          <Link className="text-white text-sm" to="#">
            Terms of Use
          </Link>
        </div>
        <div className="flex flex-col mt-3">
          <h3 className="text-white mb-4">We are in social networks</h3>
          <div className="flex items-center">
            {" "}
            <img className="h-9 w-9 object-contain" src={maxIcon} alt="max" />
            <img className="h-9 w-9 object-contain" src={IconVk} alt="vk" />
          </div>
        </div>
        <div className="flex mr-2 mt-35 ">
          <span className="text-surface-dim mr-5">
            &copy; 2026 AirSpaceUp. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

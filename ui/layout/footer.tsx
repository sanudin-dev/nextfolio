import { montserrat } from "../fonts";
import Connects from "../connects";
import GoToTop from "../buttons/gototop";

export default function Footer() {
  return (
    <footer
      className={`${montserrat.className} text-center text-xs text-content sm:text-sm border-t-1 border-primary`}
    >
      <div className="container mx-auto px-4 pt-10 pb-8">
        <GoToTop />
        <div className="sm:flex justify-between items-center">
          <div className="flex flex-col justify-center items-center sm:order-last">
            <p>Stay in Touch</p>
            <hr className="w-[6rem] mt-2 mb-3 border-t-2 border-content" />
            <Connects />
          </div>
          <p className="max-w-[15rem] m-auto mt-8 sm:m-0 sm:max-w-[16rem] md:max-w-full sm:order-first">
            &copy; {new Date().getFullYear()} Sanudin. Developed with ❤️. Build
            with Next.js hosted on Vercel.
          </p>
        </div>
      </div>
      <div className="h-3 bg-gradient-to-r from-green-500 to-blue-500"></div>
    </footer>
  );
}

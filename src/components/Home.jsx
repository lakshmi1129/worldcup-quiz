import { useNavigate } from "react-router-dom";
import stadium from "../assets/stadium.jpg";
import football from "../assets/football.webp";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${stadium})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl text-center px-6 py-10 sm:px-10 sm:py-12">

        {/* Football */}
        <img
          src={football}
          alt="Football"
          className="w-24 sm:w-32 md:w-40 mx-auto mb-6 animate-bounce"
        />

        {/* Title */}
        <h1 className="text-yellow-400 font-extrabold leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
         GOAL RUSH
        </h1>

        {/* Subtitle */}
        <h2 className="text-white mt-4 font-semibold text-xl sm:text-2xl md:text-3xl">
          Quiz 
        </h2>

        {/* Description */}
        <p className="text-gray-200 mt-6 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
          Test your football knowledge with 20 exciting FIFA World Cup
          questions. Select the correct answer and score as many goals as you
          can!
        </p>

        {/* Start Button */}
        <button
          onClick={() => navigate("/quiz")}
          className="
            mt-10
            bg-green-600
            hover:bg-green-700
            hover:scale-105
            transition-all
            duration-300
            text-white
            font-bold
            rounded-full
            shadow-xl
            px-8 py-4
            text-lg
            sm:text-xl
            md:text-2xl
            flex
            items-center
            justify-center
            gap-3
            mx-auto
          "
        >
          ⚽ Let's Start
        </button>

      </div>
    </div>
  );
}
import { useState } from "react";
import questions from "../data/question.json";
import stadium from "../assets/stadium.jpg";
import celebration from "../assets/celebration.gif";
import sorry from "../assets/sorry.gif";
import football from "../assets/football.webp";
import Confetti from "react-confetti";


export default function Quizz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSorry, setShowSorry] = useState(false);
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [gameOver, setGameOver] = useState(false);


  const question = questions[currentQuestion];

    const handleSelect = (option) => {
        if (selected || checked) return;
        setSelected(option);
    };

    const handleAnswer = (option) => {
        if (selected) return;
        setSelected(option);
        if (option === question.answer) {
        setScore(score + 1);
        setShowCelebration(true);
        setTimeout(() => {
            setShowCelebration(false);
        }, 2000);
        } else {
        setShowSorry(true);
        setTimeout(() => {
            setShowSorry(false);
        }, 2000);
        }
    };

    const checkAnswer = () => {
        if (!selected) return;

        setChecked(true);

        if (selected === question.answer) {
            setScore(score + 1);
            setShowCelebration(true);

            setTimeout(() => {
            setShowCelebration(false);
            }, 2500);
        } else {
            setShowSorry(true);

            setTimeout(() => {
            setShowSorry(false);
            }, 2500);
        }
    };

  
    const getButtonStyle = (option) => {
        if (!checked) {
            if (option === selected) {
            return "bg-blue-500 text-white border-blue-700";
            }
            return "bg-black text-white hover:bg-gray-800";
        }
        if (option === question.answer) {
            return "bg-green-500 text-white";
        }
        if (
            option === selected &&
            option !== question.answer
        ) {
            return "bg-red-500 text-white";
        }
        return "bg-black text-white";
    };

    const nextQuestion = () => {
        if (currentQuestion === questions.length - 1) {
            setGameOver(true);
            return;
        }

        setSelected(null);
        setChecked(false);
        setShowCelebration(false);
        setShowSorry(false);

        setCurrentQuestion((prev) => prev + 1);
    };

    if (gameOver) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${stadium})` }}>
                <Confetti recycle={false} numberOfPieces={800} />
                <div className="w-full max-w-2xl mx-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl text-center text-white p-6 sm:p-8 md:p-10">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-yellow-400 mb-6">
                    🏆 GAME OVER 🏆
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl mb-4">
                    FIFA World Cup Quiz Completed
                    </p>
                    <button
                    className="mt-10 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-full text-xl font-bold"
                    onClick={() => window.location.reload()}
                    >
                    🔄 Play Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{backgroundImage: `url(${stadium})`}}>
            {
                showCelebration && (
                    <>
                    <Confetti
                        recycle={false}
                        numberOfPieces={500}
                        gravity={0.2}
                    />
                    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                        {/* GOAL Text */}
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 animate-bounce">
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-green-400 drop-shadow-lg">
                            GOOOAAALLL!!
                        </h1>
                        </div>
                        {/* Flying Football */}
                        <img
                        src={football}
                        alt=""
                        className="absolute w-16 sm:w-24 md:w-28 animate-football"
                        />
                    </div>
                    </>
                )
            }
            {
                showSorry && (
                    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60"></div>
                    {/* Missed Goal Text */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
                        <h1 className="miss-text text-4xl sm:text-6xl md:text-8xl text-center px-4 font-black text-red-500">
                        ❌ Off Target!
                        </h1>
                    </div>
                    {/* Sad Football */}
                    <div className="absolute left-1/2 bottom-20 -translate-x-1/2">
                        <div className="animate-sadball text-5xl sm:text-6xl md:text-8xl">
                        ⚽😢
                        </div>
                    </div>
                    </div>
                )
            }
        <div className="w-full max-w-5xl rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-white p-5 sm:p-6 md:p-8 lg:p-10" >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <h2 className="font-bold text-2xl sm:text-3xl text-center">
                    GOAL RUSH
                </h2>
                {/* <span className="bg-green-600 text-white px-4 py-2 rounded-full">
                    Score: {score}
                </span> */}
            </div>
            <div className="mb-4">
                <p className="text-white text-base sm:text-lg md:text-xl">
                    Question {currentQuestion + 1} / {questions.length}
                </p>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center leading-relaxed">
                {question.question}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                    <button key={option} onClick={() => handleSelect(option)} className={`p-4 sm:p-5 rounded-xl border border-white text-base sm:text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-105 ${getButtonStyle(option)}`}>
                        <span className="font-bold mr-2">
                            {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                    </button>
                ))}
            </div>
            {
                selected && !checked && (
                    <div className="flex justify-center mt-8">
                    <button onClick={checkAnswer} className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl flex items-center gap-2 shadow-xl hover:scale-110 transition-all">
                        ⚽ Check Answer
                    </button>
                    </div>
                )
            }
            {
                checked && (
                    <div className="flex justify-center mt-8">
                            <button onClick={nextQuestion} className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl rounded-full flex items-center gap-2 shadow-xl hover:scale-110 transition-all">
                            ⚽ Next Question
                            </button>
                    </div>
                )
            }

            {/* {currentQuestion === questions.length - 1 &&
            selected && (
                <div className="mt-8 text-center">
                <h2 className="text-4xl font-bold text-green-600">
                    Final Score
                </h2>

                <p className="text-6xl font-bold mt-3">
                    {score}/{questions.length}
                </p>
                </div>
            )} */}
        </div>
        </div>
    );
}
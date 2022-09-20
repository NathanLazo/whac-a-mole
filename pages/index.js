import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Modal from "../components/Modal";

export default function Home() {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const [time, setTime] = useState(0);

  const difficulty = {
    easy: 900,
    medium: 600,
    hard: 300,
  };
  const [difficultyLevel, setDifficultyLevel] = useState(difficulty.easy);

  const [selectedMole, setSelectedMole] = useState(null);

  const maxMoles = 16;
  const moles = [];
  for (let i = 0; i < maxMoles; i++) {
    moles.push(i);
  }

  const selectRandomMole = () => {
    const mole = moles[getRandomInt(maxMoles - 1, 0)];
    setSelectedMole(mole);
  };

  const [score, setScore] = useState(0);
  const maxScore = 10;

  useEffect(() => {
    if (score < maxScore) {
      const interval = setInterval(() => {
        selectRandomMole();
      }, difficultyLevel);
      return () => clearInterval(interval);
    }
  });

  var start = Date.now();

  const getTime = () => {
    setTime( Math.floor((Date.now()-start) / 1000))
  }

  useEffect(() => {
    if (score < maxScore) {
    const interval = setInterval(() => {getTime()}, 1000);

    return () => clearInterval(interval);
    }
  }, [score < maxScore]);

  
  const manageWhacedMole = () => {
    setScore(score + 1);
    selectRandomMole();
  };

  return (
    <>
      <Head>
        <title>Whac a mole</title>
        <meta name="description" content="Whac a mole" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        {score >= maxScore ? <Modal time={time} /> : null}
        <div className="w-full flex justify-between px-8">
          <span className="text-white text-2xl font-bold">Score: {score}</span>
          <Image
            src="/images/whac-a-mole-logo.png"
            alt="Whac a mole logo"
            draggable={false}
            width={400}
            height={150}
          />
          <span className="text-white text-2xl font-bold">Time: {time}</span>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="mx-2 bg-green-400 hover:bg-green-300 w-28 py-2 rounded-xl"
            onClick={() => setDifficultyLevel(difficulty.easy)}
          >
            Easy
          </button>
          <button
            className="mx-2 bg-orange-400 hover:bg-orange-300 w-28 py-2 rounded-xl"
            onClick={() => setDifficultyLevel(difficulty.medium)}
          >
            Medium
          </button>
          <button
            className="mx-2 bg-red-400 hover:bg-red-300 w-28 py-2 rounded-xl"
            onClick={() => setDifficultyLevel(difficulty.hard)}
          >
            Hard
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="grid grid-cols-4 gap-4">
            {moles.map((mole) => (
              <div
                key={"mole-key-" + mole}
                className="flex justify-center bg-zinc-900 w-28 h-28 shadow-2xl hover:bg-black rounded-3xl transition-colors duration-300"
              >
                {selectedMole == mole ? (
                  <button className="w-28 h-28" onClick={manageWhacedMole}>
                    <div id={"mole-" + mole}>
                      <Image
                        src="/images/mole.png"
                        alt="Mole"
                        draggable={false}
                        width={100}
                        height={100}
                      />
                    </div>
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

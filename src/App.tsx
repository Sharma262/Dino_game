import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const dinoRef = useRef<HTMLDivElement | null>(null);
  const cactusRef = useRef<HTMLDivElement | null>(null);
  const [score, setScore] = useState<number>(0);

  const jump = () => {
    if (dinoRef.current && !dinoRef.current.classList.contains("jump")) {
      dinoRef.current.classList.add("jump");
      setTimeout(() => {
        dinoRef.current?.classList.remove("jump");
      }, 300);
    }
  };

  useEffect(() => {
    const isAlive = setInterval(() => {
      if (!dinoRef.current || !cactusRef.current) return;

      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current).getPropertyValue("top")
      );

      const cactusLeft = parseInt(
        getComputedStyle(cactusRef.current).getPropertyValue("left")
      );

      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
        alert("Game Over! Your Score : " + score);
        setScore(0);
      } else {
        setScore((prevScore) => prevScore + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  }, [score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        jump();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="game">
      Score: {score}
      <div id="dino" ref={dinoRef}></div>
      <div id="cactus" ref={cactusRef}></div>
    </div>
  );
}

export default App

import React, { useState, useEffect } from "react";

const dialogues = [
  "Hello there!",
  "How are you today?",
  "I have something interesting to tell you...",
  "React makes UI development fun!",
  "Click again to restart!"
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (charIndex < dialogues[index].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + dialogues[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 25);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, index]);

  useEffect(() => {
    setDisplayText("");
    setCharIndex(0);
  }, [index]);

  const handleNextDialogue = () => {
    setFade(false); 

    setTimeout(() => {
      setIndex((prev) => (prev < dialogues.length - 1 ? prev + 1 : 0));
      setFade(true);
    }, 500);
  };

  return (
    <div>Home</div>
  );
};

export default Home;

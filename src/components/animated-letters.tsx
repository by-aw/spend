import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

type AnimatedLettersProps = {
  text: string;
  animation: string;
  delay: number;
  className?: string;
};

function AnimatedLetters({
  text,
  animation,
  delay,
  className = "",
}: AnimatedLettersProps) {
  const [animationFinished, setAnimationFinished] = React.useState(false);
  return (
    <span className={className}>
      {text.split("").map((letter, index) => {
        return (
          <span
            onAnimationEnd={() => {
              index == text.length - 1 && setAnimationFinished(true);
            }}
            style={{ animationDelay: `${index * delay}ms` }}
            className={cn(
              animation,
              animationFinished ? "hidden" : "inline-block"
            )}
          >
            {letter}
          </span>
        );
      })}
      <span className={cn(animationFinished ? "inline-block" : "hidden")}>
        {text}
      </span>
    </span>
  );
}

export default AnimatedLetters;

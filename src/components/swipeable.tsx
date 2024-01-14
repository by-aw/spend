import { PanInfo, motion, useAnimate } from "framer-motion";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type SwipeableProps = {
  children: React.ReactNode;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  disabled?: boolean;
  setDisabled?: () => void;
  allowSwipeUp?: boolean;
  allowSwipeDown?: boolean;
};

const variants = {
  visible: { opacity: 1, y: "0%" },
  swipedDown: { opacity: 0, y: "100%" },
  swipedUp: { opacity: 0, y: "-100%" },
};
export const SwipeableContext = createContext<{
  disabled: boolean;
  swiping: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>> | undefined;
}>({ disabled: false, swiping: false, setDisabled: undefined });
function Swipeable({
  children,
  onSwipeDown,
  onSwipeUp,
  allowSwipeDown = true,
  allowSwipeUp = true,
}: SwipeableProps) {
  const [swiping, setSwiping] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [scope, animate] = useAnimate();
  function handleDragEnd(event: MouseEvent, info: PanInfo) {
    if (info.offset.y > 10 && allowSwipeDown) {
      animate(scope.current, variants.swipedDown, { duration: 0.1 });
      onSwipeDown?.();
      setTimeout(async () => {
        await animate(scope.current, variants.swipedUp, { duration: 0 });
        await animate(scope.current, variants.visible, { duration: 0.1 });
      }, 100);
    }
    if (info.offset.y < -10 && allowSwipeUp) {
      animate(scope.current, variants.swipedUp, { duration: 0.1 });
      onSwipeUp?.();
      setTimeout(async () => {
        await animate(scope.current, variants.swipedDown, { duration: 0 });
        await animate(scope.current, variants.visible, { duration: 0.1 });
      }, 100);
    }
    setSwiping(false);
  }
  return (
    <SwipeableContext.Provider value={{ disabled, swiping, setDisabled }}>
      <motion.div
        onDragStart={() => setSwiping(true)}
        drag={disabled ? undefined : "y"}
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        ref={scope}
      >
        {children}
      </motion.div>
    </SwipeableContext.Provider>
  );
}

export default Swipeable;

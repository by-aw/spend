import React from "react";
import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
} from "framer-motion";

export type SwipeableProps = {
  children: React.ReactNode;
};

function Swipeable({ children }: SwipeableProps) {
  const dragX = useMotionValue(0);
  const opacity = useTransform(dragX, [-200, -100, 0, 200], [1, 1, 0, 0]);
  const snapDrag = useTransform(dragX, [-50, -49, 0], [-120, 0, 0,])
  const dragControls = useDragControls();

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: snapDrag,
          width: "100%",
          height: "100%",
          background: "transparent",
          zIndex: 999,
        }}
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragControls={dragControls}
        dragElastic={0.1}
        dragMomentum={true}
        onDrag={(ev, { offset }) => {
          dragX.set(offset.x);
        }}
        onDragEnd={(ev, { offset }) => {
          if (offset.x < -50) {
            dragX.set(-100);
            console.log("set 120");
            offset.x = -100;
          } else {
            dragX.set(0);
            offset.x = 0;
            console.log("set 0");
          }
        }}
      >
        {children}
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 3,
          opacity,
        }}
      >
        Revealed Text
      </motion.div>
    </div>
  );
}

export default Swipeable;

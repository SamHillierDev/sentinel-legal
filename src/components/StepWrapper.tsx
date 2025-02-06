import { motion } from "framer-motion";

interface StepWrapperProps {
  children: React.ReactNode;
  direction: number;
}

const swipeVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  }),
};

const StepWrapper: React.FC<StepWrapperProps> = ({ children, direction }) => {
  return (
    <motion.div
      variants={swipeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={direction}
    >
      {children}
    </motion.div>
  );
};

export default StepWrapper;

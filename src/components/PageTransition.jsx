import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ 
        duration: 1.2, // Lebih lambat & elegan
        ease: [0.4, 0, 0.2, 1] // Smooth easing
      }}
      // KUNCI: absolute agar tidak mendorong layout, inset-0 agar full screen
      className="absolute inset-0 w-full h-screen overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
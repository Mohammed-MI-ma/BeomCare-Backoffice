import { Suspense } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const CustomSuspense = ({ children, id }) => {
  return (
    <Suspense
      fallback={
        <Spin
          spinning
          fullscreen
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      }
      onError={(error) => console.error("Error during suspense:", error)}
    >
      <motion.div
        initial={{ x: 0, opacity: 0 }} // Initial animation state
        animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }} // Animation when component enters
        exit={{ opacity: 0 }} // Animation when component exits
        key={id}
      >
        {children}
      </motion.div>
    </Suspense>
  );
};

export default CustomSuspense;

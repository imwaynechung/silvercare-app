import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 border-4 border-blue-200 rounded-full"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-t-blue-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.p
        className="mt-4 text-lg text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        正在生成您的個人化報告...
      </motion.p>
      <motion.p
        className="mt-2 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        我們將很快通過電郵發送給您
      </motion.p>
    </div>
  );
};

export default LoadingAnimation;
'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CustomShadowDivProps {
  children: ReactNode;
  className?: string;
  shadowSize?: number;
  shadowColor?: string;
  interactive?: boolean;
}

const CustomShadowDiv = ({
  children,
  className,
  shadowSize = 8,
  shadowColor = 'rgb(35,8,73)',
  interactive = true,
  style,
  ...props
}: React.ComponentProps<'div'> & CustomShadowDivProps) => {
  return (
    <motion.div
      className={cn(
        'bg-white border-6 border-[#230849] select-none',
        className,
      )}
      style={{
        boxShadow: `-${shadowSize}px ${shadowSize}px 0px 0px ${shadowColor}`,
        ...style,
      }}
      whileHover={
        interactive
          ? {
              x: -(shadowSize * 0.55),
              y: shadowSize * 0.55,
              boxShadow: `-${shadowSize * 0.3}px ${shadowSize * 0.3}px 0px 0px ${shadowColor}`,
              transition: { type: 'spring', stiffness: 320, damping: 20 },
            }
          : undefined
      }
      whileTap={
        interactive
          ? {
              x: -shadowSize,
              y: shadowSize,
              boxShadow: `0px 0px 0px 0px ${shadowColor}`,
              transition: { type: 'spring', stiffness: 400, damping: 18 },
            }
          : undefined
      }
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
};

export default CustomShadowDiv;

'use client';

import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CustomButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const CustomButton = ({
  icon,
  children,
  isLoading,
  disabled,
  className,
  iconPosition = 'left',
  type = 'button',
  ...props
}: React.ComponentProps<'button'> & CustomButtonProps) => {
  return (
    <motion.div
      style={{ display: 'inline-flex' }}
      whileHover={{
        x: -3.3,
        y: 3.3,
        transition: { type: 'spring', stiffness: 320, damping: 20 },
      }}
      whileTap={{
        x: -6,
        y: 6,
        transition: { type: 'spring', stiffness: 400, damping: 18 },
      }}
    >
      <Button
        type={type}
        disabled={isLoading || disabled}
        className={cn(
          'flex justify-center items-center h-11.5 px-6 gap-2 rounded-[0.625rem] cursor-pointer bg-white! border-6 border-[#230849] text-[#230849] shadow-[-6px_6px_0px_0px_rgb(35,8,73)] transition-[box-shadow] duration-200 ease-out hover:shadow-[-2px_2px_0px_0px_rgb(35,8,73)] hover:bg-white!',
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin flex-none block!" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="size-auto">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="size-auto">{icon}</span>
            )}
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default CustomButton;

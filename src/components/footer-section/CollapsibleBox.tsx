'use client';

import TriangleRightIcon from '@/components/icons/TriangleRightIcon';
import { cn } from '@/lib/utils';

interface CollapsibleBoxProps {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}

const CollapsibleBox = ({
  title,
  description,
  isOpen,
  onToggle,
}: CollapsibleBoxProps) => {
  return (
    <div
      className="flex flex-col h-full bg-white border-4 border-[#230849] px-6 py-3.5 rounded-[1rem] max-h-max cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between flex-none gap-4">
        <p className="text-[#230849] lg:text-2xl uppercase leading-[100%] tracking-tight">
          {title}
        </p>

        <TriangleRightIcon
          className={cn(
            'flex-none size-3 lg:size-4 cursor-pointer transition-transform duration-300 ease-in-out',
            isOpen ? 'rotate-90' : 'rotate-0',
          )}
        />
      </div>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p
            className={cn(
              'text-[#230849] text-sm lg:text-base font-neue-montreal text-justify transition-all duration-300 ease-in-out',
              isOpen ? 'mt-2.5 opacity-100' : 'opacity-0',
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleBox;

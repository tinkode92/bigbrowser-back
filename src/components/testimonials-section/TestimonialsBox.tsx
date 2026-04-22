import Image from 'next/image';
import DoubleCommasIcon from '@/components/icons/DoubleCommasIcon';
import FilledStarIcon from '@/components/icons/FilledStarIcon';
import { cn } from '@/lib/utils';

interface TestimonialsBoxProps {
  username: string;
  userAvatarUrl: string;
  userJobTitle: string;
  content?: string;
  starsCount?: number;
  metric?: string;
  className?: string;
}

const TestimonialsBox = ({
  username,
  userAvatarUrl,
  userJobTitle,
  content,
  starsCount = 0,
  metric,
  className,
}: TestimonialsBoxProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-[1rem] border-4 border-[#230151] p-7.5 h-max',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col h-full',
          starsCount > 0 ? 'gap-8.5' : 'gap-4',
        )}
      >
        {starsCount > 0 ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-x-1 lg:gap-x-2">
              {Array.from({ length: starsCount }).map((_, i) => (
                <FilledStarIcon key={i} className="size-3.5 lg:size-4" />
              ))}
            </div>
            <DoubleCommasIcon className="size-4 lg:size-5" />
          </div>
        ) : null}
        <p className="text-[#3D3D3D] text-sm lg:text-base font-medium font-neue-montreal">
          {content || 'N/A'}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            {userAvatarUrl && userAvatarUrl.trim().length > 0 ? (
              <Image
                src={userAvatarUrl}
                alt={`${username}-avatar`}
                width={200}
                height={200}
                className="rounded-full size-10 lg:size-12 object-cover object-center flex-none"
              />
            ) : (
              <div className="flex items-center justify-center rounded-full size-10 lg:size-12 font-neue-montreal font-semibold text-[#230849] bg-[#E9D9FF]">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm lg:text-base font-neue-montreal font-semibold">
                {username}
              </p>
              <p className="font-neue-montreal text-[#6D6D6D] text-xs lg:text-sm">
                {userJobTitle}
              </p>
              {metric && (
                <p className="font-neue-montreal text-[10px] font-semibold text-emerald-600 mt-0.5 tracking-tight">
                  ↑ {metric}
                </p>
              )}
            </div>
          </div>
          {starsCount === 0 && (
            <DoubleCommasIcon className="size-11 lg:size-14.5" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsBox;

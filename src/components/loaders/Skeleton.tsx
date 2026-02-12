import { twMerge } from "tailwind-merge";

interface SkeletonProps {
  rows?: number;       
  height?: string;    
  className?: string; 
}

const Skeleton = ({
  rows = 3,
  height = 'h-5',
  className = ""
}: SkeletonProps) => {
  return (
    <div className={twMerge(`flex flex-col gap-3 w-full`, className)}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={`
            ${height} 
            bg-gray-200 
            rounded-3xl
            animate-pulse 
            w-full
          `}
          // Optional: make the last line shorter for a "paragraph" look
          style={{ width: index === rows - 1 && rows > 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  );
};

export default Skeleton;
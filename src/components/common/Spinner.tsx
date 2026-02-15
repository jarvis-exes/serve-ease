interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    className?: string;
}

const Spinner = ({
    size = 'md',
    color = 'border-green-500',
    className = ""
}: SpinnerProps) => {

    const sizeClasses = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-3',
        lg: 'h-12 w-12 border-4',
        xl: 'h-16 w-16 border-4'
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div
                className={`
          ${sizeClasses[size]}
          ${color}
          animate-spin
          rounded-full
          border-t-transparent
        `}
                role="status"
                aria-label="loading"
            />
        </div>
    );
};

export default Spinner;
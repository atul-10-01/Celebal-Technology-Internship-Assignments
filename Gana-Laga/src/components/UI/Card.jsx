import { HiPlay } from 'react-icons/hi';
import Button from './Button';

const Card = ({ 
  title, 
  subtitle, 
  image, 
  onClick, 
  onPlayClick,
  className = '',
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-gray-900 bg-opacity-50 hover:bg-opacity-70',
    compact: 'bg-gray-800 bg-opacity-50 hover:bg-opacity-70'
  };

  return (
    <div 
      className={`${variants[variant]} rounded-lg p-4 cursor-pointer transition-all duration-300 group relative ${className}`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative mb-3">
        <img
          src={image}
          alt={title}
          className="w-full aspect-square rounded-lg object-cover shadow-lg"
          loading="lazy"
        />
        
        {/* Play Button Overlay */}
        {onPlayClick && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              variant="primary"
              size="sm"
              className="!rounded-full w-10 h-10 !p-0 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onPlayClick();
              }}
            >
              <HiPlay className="h-4 w-4 ml-0.5" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-medium text-white text-sm md:text-base truncate">{title}</h3>
        <p className="text-gray-400 text-xs md:text-sm truncate">{subtitle}</p>
      </div>
    </div>
  );
};

export default Card;

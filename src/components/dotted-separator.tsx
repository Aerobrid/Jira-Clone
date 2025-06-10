// cn combiens classnames together, which makes it easier to combine default styles with custom styles
import { cn } from "@/lib/utils"

// props for the DottedSeparator component
interface DottedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
};

// DottedSeparator component renders a dotted line separator
export const DottedSeparator = (
  // destructuring the props with default values, and passing them to the component
  {
  className,
  color = '#d4d4d8',
  height = "2px",
  dotSize = "2px",
  gapSize = "6px",
  direction = "horizontal"
}: DottedSeparatorProps) => {
  // boolean determining if separator is horizontal
  const isHorizontal = direction === "horizontal";

  // return the separator with the appropriate styles based on the props
  return (
    // using cn utility to combine class names
    <div className={cn(
      isHorizontal ? "w-full flex items-center" : "h-full flex flex-col items-center",
      className,
    )}>
      <div
        className={isHorizontal ? "flex-grow" : "flex-grow-0"}
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
          // get integer values for dot and gap sizes from strings (ignores units like px or em) 
          backgroundSize: isHorizontal ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}` : `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
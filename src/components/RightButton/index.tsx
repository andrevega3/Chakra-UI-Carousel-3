import { ChevronRightIcon } from "lucide-react";
import {
  Box,
  Button,
  ButtonProps
} from "@chakra-ui/react";
import React, { useContext, ReactElement } from "react";
import { Context, ContextType } from "../Provider";

interface CustomButtonProps extends ButtonProps {
  customIcon?: ReactElement;
}

export const RightButton = ({
  customIcon,
  ...props
}: CustomButtonProps) => {
  const context = useContext(Context);

  const { setTrackIsActive, activeItem, constraint, positions, setActiveItem, infinite } =
    context as ContextType;

  const handleFocus = () => setTrackIsActive(true);

  const handleIncrementClick = () => {
    setTrackIsActive(true);

    console.log("➡️ RIGHT CLICK");
    console.log("activeItem:", activeItem);
    console.log("currentPosition:", positions[activeItem]);

    if (infinite) {
      const total = positions.length;
      const firstReal = constraint;
      const lastReal = total - constraint;

      if (activeItem + 1 >= lastReal) {
        console.log("🔁 Wrapping to START:", firstReal);
        setActiveItem(firstReal); // Snap to beginning clone
      } else {
        setActiveItem(activeItem + 1);
      }
    } else {
      if (activeItem < positions.length - constraint) {
        setActiveItem(activeItem + 1);
      }
    }
  };

  return (
    <Button
      {...props}
      onClick={handleIncrementClick}
      onFocus={handleFocus}
      zIndex={2}
      minW={0}
    >
      {customIcon ? <Box>{customIcon}</Box> : <ChevronRightIcon size={9} />}
    </Button>
  );
};


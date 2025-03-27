import {
  Box,
  Button,
  ButtonProps
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "lucide-react";
import React, { useContext, ReactElement } from "react";
import { Context, ContextType } from "../Provider";

interface CustomButtonProps extends ButtonProps {
  customIcon?: ReactElement;
}

export const LeftButton = ({
  customIcon,
  ...props
}: CustomButtonProps) => {
  const context = useContext(Context);

  const { setTrackIsActive, activeItem, positions, setActiveItem, constraint, infinite } =
    context as ContextType;

  const handleFocus = () => setTrackIsActive(true);

  const handleDecrementClick = () => {
    setTrackIsActive(true);

    console.log("⬅️ LEFT CLICK");
    console.log("activeItem:", activeItem);
    console.log("currentPosition:", positions[activeItem]);

    if (infinite) {
      const total = positions.length;
      const firstReal = constraint;
      const lastReal = total - constraint;

      if (activeItem - 1 < firstReal) {
        console.log("🔁 Wrapping to END:", lastReal - 1);
        setActiveItem(lastReal - 1); // snap to end clone
      } else {
        setActiveItem(activeItem - 1);
      }
    } else {
      if (activeItem > 0) {
        setActiveItem(activeItem - 1);
      }
    }
  };

  return (
    <Button
      {...props}
      onClick={handleDecrementClick}
      onFocus={handleFocus}
      zIndex={2}
      minW={0}
    >
      {customIcon ? <Box>{customIcon}</Box> : <ChevronLeftIcon size={9} />}
    </Button>
  );
};


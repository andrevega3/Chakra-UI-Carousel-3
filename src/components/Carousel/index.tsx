import { useBreakpointValue } from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo } from "react";
import Item from "../Item";
import { Context, ContextType } from "../Provider";
import Slider from "../Slider";
import Track from "../Track";

export interface CarouselPropTypes {
  children: React.ReactNode[];
  gap: number;
}

export const Carousel: React.FC<CarouselPropTypes> = ({
  children,
  gap,
}) => {
  const context = useContext(Context);
  if (!context) {
    console.error("❌ Carousel must be wrapped in <Provider>");
    return null;
  }

  const {
    setItemWidth,
    sliderWidth,
    setMultiplier,
    setConstraint,
    itemWidth,
    setPositions,
    multiplier,
    constraint,
    positions,
    infinite,
    autoplay,
  } = context;

  const layout = useBreakpointValue({
    base: { multiplier: 0.65, constraint: 1, divisor: 1 },
    md: { multiplier: 0.5, constraint: 2, divisor: 2 },
    xl: { multiplier: 0.35, constraint: 3, divisor: 3 },
  });

  const mapChildren = useMemo(() => {
    if (!infinite || constraint === 0) return children;

    const result = [
      ...children.slice(-constraint),       // prepended clones
      ...children,
      ...children.slice(0, constraint + 1)  // extended clones after end
    ];

    console.log("🧮 Rendering indexes:", result.map((_, i) => i));
    return result;
  }, [children, infinite, constraint]);

  useEffect(() => {
    if (!layout) return;

    const newItemWidth = sliderWidth / layout.divisor - gap;

    setItemWidth(newItemWidth);
    setMultiplier(layout.multiplier);
    setConstraint(layout.constraint);
  }, [layout, sliderWidth, gap]);

  useEffect(() => {
    const newPositions = mapChildren.map(
      (_, index) => -Math.abs((itemWidth + gap) * index)
    );

    if (JSON.stringify(newPositions) !== JSON.stringify(positions)) {
      setPositions(newPositions);
      console.log("📍 Updated Positions:", newPositions);
    }
  }, [mapChildren, gap, itemWidth, positions, setPositions]);

  return (
    <Slider gap={gap}>
      <Track>
        {mapChildren.map((child, index) => (
          <Item gap={gap} key={index} index={index}>
            {child}
          </Item>
        ))}
      </Track>
    </Slider>
  );
};
import { useState, useCallback } from "react";

interface CarouselProps {
  carouselRef: React.RefObject<HTMLDivElement>;
}

function useCarousel({ carouselRef }: CarouselProps): {
  carouselXTranslate: number;
  setCarouselXTranslate: (value: number) => void;
  handleLeftButton: () => void;
  handleRightButton: () => void;
} {
  const [currentCardPos, setCurrentCardPos] = useState<number>(0);
  const [carouselXTranslate, setCarouselXTranslate] = useState<number>(0);

  const findCarouselMeta = useCallback((): {
    totalVisibleCards: number;
    carouselGap: number;
    cardWidth: number;
    totalCards: number;
  } => {
    const carouselElm = carouselRef.current;

    if (carouselElm) {
      const firstCard = carouselElm.firstChild as HTMLElement;
      const firstCardWidth = firstCard.getBoundingClientRect().width;
      const carouselWidth = carouselElm.getBoundingClientRect().width;
      const carouselGap = Number(
        window.getComputedStyle(carouselElm).gap.replace("px", ""),
      );
      const totalVisibleCards = Math.trunc(
        carouselWidth / (firstCardWidth + carouselGap),
      );

      return {
        totalVisibleCards,
        carouselGap,
        cardWidth: firstCardWidth,
        totalCards: carouselElm.childElementCount,
      };
    }

    return {
      totalVisibleCards: 0,
      carouselGap: 0,
      cardWidth: 0,
      totalCards: 0,
    };
  }, [carouselRef]);

  const handleLeftButton = useCallback(() => {
    const { totalVisibleCards, carouselGap, cardWidth, totalCards } =
      findCarouselMeta();

    if (totalVisibleCards >= totalCards) {
      setCurrentCardPos(0);
      setCarouselXTranslate(0);
      return;
    }
    const nextCardPos = Math.max(0, currentCardPos - totalVisibleCards);
    setCurrentCardPos(nextCardPos);
    setCarouselXTranslate(
      -1 * (nextCardPos * cardWidth + nextCardPos * carouselGap),
    );
  }, [currentCardPos, findCarouselMeta]);

  const handleRightButton = useCallback(() => {
    const { totalVisibleCards, carouselGap, cardWidth, totalCards } =
      findCarouselMeta();

    if (totalVisibleCards >= totalCards) {
      setCurrentCardPos(0);
      setCarouselXTranslate(0);
      return;
    }
    const nextCardPos = Math.min(
      currentCardPos + totalVisibleCards,
      totalCards - totalVisibleCards,
    );
    setCurrentCardPos(nextCardPos);
    setCarouselXTranslate(
      -1 * (nextCardPos * cardWidth + nextCardPos * carouselGap),
    );
  }, [currentCardPos, findCarouselMeta]);

  return {
    carouselXTranslate,
    setCarouselXTranslate,
    handleLeftButton,
    handleRightButton,
  };
}

export default useCarousel;

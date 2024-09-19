import { useState, useCallback } from "react";

interface CarousalProps {
  carousalRef: React.RefObject<HTMLDivElement>;
}

function useCarousal({ carousalRef }: CarousalProps): {
  carousalXTranslate: number;
  handleLeftButton: () => void;
  handleRightButton: () => void;
} {
  const [currentCardPos, setCurrentCardPos] = useState<number>(0);
  const [carousalXTranslate, setCarousalXTranslate] = useState<number>(0);

  const findCarousalMeta = useCallback((): {
    totalVisibleCards: number;
    carousalGap: number;
    cardWidth: number;
    totalCards: number;
  } => {
    const carousalElm = carousalRef.current;

    if (carousalElm) {
      const firstCard = carousalElm.firstChild as HTMLElement;
      const firstCardWidth = firstCard.getBoundingClientRect().width;
      const carousalWidth = carousalElm.getBoundingClientRect().width;
      const carousalGap = Number(
        window.getComputedStyle(carousalElm).gap.replace("px", ""),
      );
      const totalVisibleCards = Math.trunc(
        carousalWidth / (firstCardWidth + carousalGap),
      );

      return {
        totalVisibleCards,
        carousalGap,
        cardWidth: firstCardWidth,
        totalCards: carousalElm.childElementCount,
      };
    }

    return {
      totalVisibleCards: 0,
      carousalGap: 0,
      cardWidth: 0,
      totalCards: 0,
    };
  }, [carousalRef]);

  const handleLeftButton = useCallback(() => {
    const { totalVisibleCards, carousalGap, cardWidth, totalCards } =
      findCarousalMeta();

    if (totalVisibleCards >= totalCards) {
      setCurrentCardPos(0);
      setCarousalXTranslate(0);
      return;
    }
    const nextCardPos = Math.max(0, currentCardPos - totalVisibleCards);
    setCurrentCardPos(nextCardPos);
    setCarousalXTranslate(
      -1 * (nextCardPos * cardWidth + nextCardPos * carousalGap),
    );
  }, [currentCardPos, findCarousalMeta]);

  const handleRightButton = useCallback(() => {
    const { totalVisibleCards, carousalGap, cardWidth, totalCards } =
      findCarousalMeta();

    if (totalVisibleCards >= totalCards) {
      setCurrentCardPos(0);
      setCarousalXTranslate(0);
      return;
    }
    const nextCardPos = Math.min(
      currentCardPos + totalVisibleCards,
      totalCards - totalVisibleCards,
    );
    setCurrentCardPos(nextCardPos);
    setCarousalXTranslate(
      -1 * (nextCardPos * cardWidth + nextCardPos * carousalGap),
    );
  }, [currentCardPos, findCarousalMeta]);

  return { carousalXTranslate, handleLeftButton, handleRightButton };
}

export default useCarousal;

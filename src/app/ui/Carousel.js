"use client"

import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

//Push the badges of badgeGroup into the Carousel component.
const CarouselPage = ({ contents, index, CarouselComponent}) => (
    <div key={`carousel-${index}`} className="w-full snap-center shrink-0 grid grid-cols-3 grid-rows-2 gap-3">
      {contents.map((content) => (
        <CarouselComponent key={content.badgeName} content={content}></CarouselComponent>
      ))}
    </div>
);

// Carousel Indicator
const CarouselIndicator = ({ totalCarousels, currentCarousel }) => (
    <div className="flex space-x-2 justify-center mt-2">
        {Array.from({ length: totalCarousels }).map((_, index) => (
        <div
            key={index}
            className={clsx(
            'h-2 w-2 rounded-full',
            {
                'bg-white': currentCarousel === index,
                'bg-gray-400': currentCarousel !== index
            }
            )}
        />
        ))}
    </div>
    );


export default function Carousel({contents, CarouselComponent}){
    const [currentCarousel, setCurrentCarousel] = useState(0);
    const containerRef = useRef();

    //On each scroll event in containerRef, update the currentCarousel for Carousel Indicator.
    useEffect(() => {
        const handleScroll = () => {
          const container = containerRef.current;
          if (container) {
            const scrollLeft = container.scrollLeft;
            const index = Math.round(scrollLeft / container.clientWidth);
            setCurrentCarousel(index);
          }
        };
    
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return(
        <>
            <div 
                ref={containerRef}
                className='flex overflow-x-auto snap-mandatory snap-x scrollbar-hide'
            >
                {contents.map((content, index)=>(
                    <CarouselPage key={index} contents={content} index={index} CarouselComponent={CarouselComponent}></CarouselPage>
                ))}
            </div>
            <CarouselIndicator totalCarousels={contents.length} currentCarousel={currentCarousel}></CarouselIndicator>        
        </>
    )
}
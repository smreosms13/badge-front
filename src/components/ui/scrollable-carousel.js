"use client"

import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

//Push the badges of badgeGroup into the Carousel component.
const CarouselPage = ({ contents, index, CarouselComponent}) => (
    <div key={`carousel-${index}`} className="w-full snap-center shrink-0 grid grid-cols-3 grid-rows-2 gap-1 mt-2 ">
      {contents.map((content) => (
        <CarouselComponent key={`${content.badgeName}-${content.id}`} content={content}></CarouselComponent>
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


function Carousel({contents, CarouselComponent}){
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
                className='flex overflow-hidden overflow-x-auto snap-x scrollbar-hide'
            >
                {contents.map((content, index)=>(
                    <CarouselPage key={`carouselPage-${index}`} contents={content} index={index} CarouselComponent={CarouselComponent}></CarouselPage>
                ))}
            </div>
            <CarouselIndicator totalCarousels={contents.length} currentCarousel={currentCarousel}></CarouselIndicator>        
        </>
    )
}

function CarouselContainer({contents, CarouselComponent}) {

    const maxContentPerPage = 6;
    const [contentGroups, setContentGroups] = useState([]);

    useEffect(() => {
        const newContentGroups = [];
        for (let i = 0; i < contents.length; i += maxContentPerPage) {
            newContentGroups.push(contents.slice(i, i + maxContentPerPage));
        }
        setContentGroups(newContentGroups);
    }, [ contents]);
    
    return(
        <Carousel contents={contentGroups} CarouselComponent={CarouselComponent}></Carousel>
    )

};

export { 
    Carousel,
    CarouselContainer
}
"use client"
import CarouselContainer from '../CarouselContainer';
import Badge from '../Badge';
import { useState, useEffect } from 'react';

export default function BadgeContainer({name, contents}) {
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Log the updated contents when it changes
        console.log('contents:', contents);

        if(contents){
            setIsLoading(false);
        }
    }, [contents]);

    return(
        <>
            <div className="flex flex-col rounded-3xl h-48 bg-blue-950 p-2">
                <div className="mb-2 text-center">
                    <p className="text-white text-lg">{name}</p>
                </div>
                {isLoading ?(
                    <p className='text-white text-lg text-center'>Loading....</p> 
                ) : (
                    <CarouselContainer contents={contents} CarouselComponent={Badge}></CarouselContainer>
                )}
            </div>
        </>
    )

};
import Carousel from './Carousel';
import { useState, useEffect } from 'react';

const filterValid = (contents) => {
    return contents.filter(content => content.isValid === "true");
};

export default function CarouselContainer({contents, CarouselComponent}) {

    const maxContentPerPage = 6;
    const [contentValid, setContentValid] = useState([]);
    const [contentGroups, setContentGroups] = useState([]);
    const useFilterValid = contents && contents[0].hasOwnProperty('isValid');
    
    console.log('useFilterValid', useFilterValid);
    
    useEffect(() => {
        setContentValid(useFilterValid ? filterValid(contents) : contents);
        console.log('useEffect for setContentValid', contentValid);
    },[contents]);
    
    // Slice contentValid into chunks of maxContentPerPage.

    useEffect(() => {
        const newContentGroups = [];
        console.log(contentValid.length)
    
        for (let i = 0; i < contentValid.length; i += maxContentPerPage) {
            newContentGroups.push(contentValid.slice(i, i + maxContentPerPage));
        }
        setContentGroups(newContentGroups);
        console.log('contentGroups:', contentGroups);
    }, [ contentValid, maxContentPerPage]);
    
      
    return(
        <Carousel contents={contentGroups} CarouselComponent={CarouselComponent}></Carousel>
    )

};
"use client"
import CarouselContainer from '@/components/ui/CarouselContainer';
import Badge from '@/components/ui/Badge';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/Context';
import axios from 'axios';

export default function BadgeContainer({name}) {
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();
    const [contents, setContents] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log(currentUser?.uid)
            const dataToSend = {
                userId : currentUser?.uid
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getAllMyVDBs`, dataToSend );
            const data = response.data
            setContents(data);
            setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    return(
        <>
            <div className="flex flex-col rounded-3xl h-48 bg-blue-950 p-2">
                <div className="mb-2 text-center">
                    <p className="text-white text-lg">{name}</p>
                </div>
                {isLoading ?  (
                        <p className='text-white text-lg text-center'>Loading....</p>
                    ) : (
                    (contents.length !== 0 ) ? (
                        <CarouselContainer contents={contents} CarouselComponent={Badge} />
                    )  : (
                        <p className='text-white text-lg text-center'>No Data....</p>
                    )
                    ) 
                }
            </div>
        </>
    )
};
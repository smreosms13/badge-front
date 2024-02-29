"use client"
import CarouselContainer from '@/components/ui/CarouselContainer';
import Badge from '@/components/ui/Badge';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/Context';
import axios from 'axios';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default function BadgeContainer() {
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
            const data = response.data.sort((a, b) => {
                return new Date(b.issuanceDate) - new Date(a.issuanceDate)
            })
            setContents(data);
            setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    return(
        <>
            <div className="flex flex-col rounded-3xl h-52 bg-blue-950 p-2">
                <div className=" text-center">
                    <p className="text-white text-lg">디지털 배지</p>
                </div>
                {isLoading ?  (
                        <div className='flex justify-center items-center min-h-40'>
                            <ArrowPathIcon className='w-16 h-16 animate-spin fill-white'></ArrowPathIcon>
                        </div>
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
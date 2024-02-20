"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/Context';
import Badge from '@/components/homepage/certificate/Badge';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
export default function BadgeList() {
    const [contents, setContents] = useState(null);
    const {currentUser} = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {

        const dataToSend = {
            userId : currentUser?.uid,
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getAllMyVDBs`, dataToSend);
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
      <div className='overflow-y-auto scrollbar-hide'>
         
            {isLoading ? 
                (
                  <div className='flex justify-center min-h-96 items-center'>
                    <ArrowPathIcon className='w-20 h-20 animate-spin fill-blue-300'></ArrowPathIcon>
                  </div>
                ) : 
                ( <div className="grid grid-cols-3 gap-2 max-h-96  overflow-y-auto scrollbar-hide">
                    { contents.map((content, index) => (
                        <Badge key={`${content.id}-${index}`} content={content}></Badge>
                    )) }
                  </div>
                )
            }
        
      </div>
       
    )
}; 
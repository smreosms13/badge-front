"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/Context';
import Badge from '@/components/homepage/certificate/Badge';

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
        const data = response.data
        const contentsArray = Array.isArray(data) ? data : [data];  
        setContents(contentsArray);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    return(
        <div className="grid grid-cols-3 gap-2 h-84 overflow-y-scroll p-2 scrollbar-hide">
            {isLoading ? 
                (<p>Loading...</p>) : 
                (
                    contents.map((content) => (
                        <Badge key={content.id} content={content}></Badge>
                    ))
                )
            }
        </div>
    )
}; 
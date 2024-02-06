"use client"
import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@/context/Context';
import SBadge from './selectbadge';

const SelectBadge = ({onImageClick}) => {
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

    
    
      const goToPage = () => {
        // 클릭한 이미지를 다른 페이지에 전달합니다.
        router.push({
          pathname: '/other-page',
          query: { images: JSON.stringify(selectedImages) },
        });
      };


    return(
        <div>
            {isLoading ? 
                (<p>Loading...</p>) : 
                (
                    contents.map((content, index) => (
                        <SBadge key={`${content.id}-${index}`} content={content} onClick={()=> onImageClick(content)} ></SBadge>
                    ))
                )
            }
            <button style={{ 
                    backgroundColor: 'black', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '5px', 
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)'}}
                    onClick={goToPage}>Go to other page</button>
        </div>
    )
}; 

export default React.memo(SelectBadge);
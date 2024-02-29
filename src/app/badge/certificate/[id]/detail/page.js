"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import BadgeDetail from '@/components/homepage/certificate/BadgeDetail';
import axios from 'axios';
import { useAuth } from '@/context/Context';


export default function Page() {
    const params = useParams();
    const badgeID = decodeURIComponent(params.id);
    const { currentUser } = useAuth();
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {

            console.log(currentUser.uid)
            const dataToSend = {
                userId : currentUser?.uid,
                badgeID : badgeID
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/getVDBByUserIDAndBadgeID`, dataToSend
            );
            const data = response.data
            const contentsArray = Array.isArray(data) ? data[0] : data;
            setContent(contentsArray);
            console.log(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            {content ? 
            (<>
                <BadgeDetail content={content}></BadgeDetail>
            </>
            ) : (
                <p>Loading...</p>
            ) }
        </>
    );
}
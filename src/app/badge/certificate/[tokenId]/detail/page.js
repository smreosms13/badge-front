"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import Banner from "@/app/ui/certificate/Banner";
import Table from "@/app/ui/certificate/Table";


export default function Page() {
    const params = useParams();
    const tokenId = params.tokenId;

    const [content, setContent] = useState(null);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPublicVDBByTokenID/${tokenId}`);
                const data = await response.json();
                setContent(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {content ? 
            (<>
                <Banner content={content}></Banner>
                <Table content={content}></Table>
            </>
            ) : (
                <p>Loading...</p>
            ) }
        </>
    );
}
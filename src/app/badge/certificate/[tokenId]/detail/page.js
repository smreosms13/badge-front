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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPublicVDBByTokenID/${tokenId}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // Replace '*' with the specific origin(s) you want to allow
                    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
                    },
                });
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
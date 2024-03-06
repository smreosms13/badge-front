"use client"
import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useAuth } from '@/context/Context'; 
import Badge from '@/components/homepage/certificate/Badge'; 
import { ArrowPathIcon } from '@heroicons/react/24/solid'; 

export default function BadgeList() {
    // State variables for storing data and loading state
    const [contents, setContents] = useState(null); 
    const { currentUser } = useAuth(); // Fetching current user from context
    const [isLoading, setIsLoading] = useState(true); // State to manage loading state

    // Fetch data when the component mounts
    useEffect(() => {
      fetchData();
    }, []);

    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const dataToSend = {
            userId : currentUser?.uid, // Sending user ID for fetching relevant data
        }
        // Sending POST request to the API endpoint
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getAllMyVDBs`, dataToSend);
        // Sorting the received data based on issuance date
        const data = response.data.sort((a, b) => {
          return new Date(b.issuanceDate) - new Date(a.issuanceDate)
        })
        // Setting the fetched data and updating loading state
        setContents(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error); // Logging error if fetching fails
      }
    };

    // Rendering the BadgeList component
    return(
      <div className='overflow-y-auto scrollbar-hide'>
         
            {isLoading ? 
                (
                  // Displaying loading spinner while data is being fetched
                  <div className='flex justify-center min-h-96 items-center'>
                    <ArrowPathIcon className='w-20 h-20 animate-spin fill-blue-300'></ArrowPathIcon>
                  </div>
                ) : 
                ( // Displaying badges if data has been fetched
                  <div className="grid grid-cols-3 gap-2 max-h-96  overflow-y-auto scrollbar-hide">
                    { contents.map((content, index) => (
                        <Badge key={`${content.id}-${index}`} content={content}></Badge>
                    )) }
                  </div>
                )
            }
        
      </div>
    )
}; 

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../constants'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const [userDoc, setUserDoc] = useState('')

    const getUserById =  async()=>{
        try {
            const res = await axios.get(`${BASE_URL}user/getUserById/${id}`)
            console.log(res?.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUserById()            
    }, [id]);
  return (
    <div>Profile</div>
  )
}

export default Profile
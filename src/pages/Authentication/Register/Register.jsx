import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import UseAuth from '../../../Hook/useAuth';
import axios from 'axios';
import useAxios from '../../../Hook/useAxios';
import SocialLogin from '../../SocialLogin/SocialLogin';

export default function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {createUser, updateUserProfile} = UseAuth();
    const [profilePic,setProfilePic] = useState('')
    const axiosInstance = useAxios();
    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
        .then( async (result) => {
          console.log(result.user);

          // update user profile in the database //

          const userInfo = {
            email: data.email,
            role: 'user',
            created_at:  new Date().toISOString(),
            last_log_in: new Date().toISOString()

          }

          const userRes = await axiosInstance.post('/users',userInfo)
          console.log(userRes.data);
          

          // update userInfo in the firebase //

          

          const userProfile = {
            displayName : data.name,
            photoURL : profilePic

          }

          updateUserProfile(userProfile)
          .then(() => {
            console.log('profile name is updated');
            
          }) 
          .catch(error => {
            console.log(error);
            
          })
          
        })
        .catch(error => {
          console.log(error);
          
        })
    }

    const handleProfileUpdate = async (e) => {
    const image =  e.target.files[0]
    console.log(image);
    const formData = new FormData
    formData.append('image', image)
    const imageUpdateUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

    const res = await axios.post(imageUpdateUrl, formData)
    setProfilePic(res.data.data.url)
    }


  return (
    <div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-3xl font-bold text-center">Register now!</h1>
      <div className="card-body">
     <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" {...register('email', {required: true})}className="input" placeholder="Your Name" />
          {
            errors.email?.type === 'required' && <p className='text-red-600'>Name is required</p>
          }

          {/* profile update */}
          <label className="label">Profile</label>
          <input onChange={handleProfileUpdate} type="file"className="input" placeholder="Your file" required />

          {/* email */}

          <label className="label">Email</label>
          <input type="email" {...register('email', {required: true})}className="input" placeholder="Email" />
          {
            errors.email?.type === 'required' && <p className='text-red-600'>Email is required</p>
          }
          <label className="label">Password</label>
          <input type="password" {...register('password', {required:true, minLength:6}
          )} className="input" placeholder="Password" />
          {
            errors.password?.type === 'required' && <p className='text-green-500'>password is required</p>
          }
          {
            errors.password?.type === 'minLength' && <p className='text-green-500'>password must be 6 characters</p>
          }
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <SocialLogin></SocialLogin>
     </form>
      </div>
    </div>
  </div>

  )
}

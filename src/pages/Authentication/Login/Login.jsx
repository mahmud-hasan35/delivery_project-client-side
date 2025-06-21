import React from 'react'
import { useForm } from 'react-hook-form'

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = data => {
        console.log(data);
        
    }
  return (
    <div>
       <form onSubmit={handleSubmit(onSubmit)}>
         <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email')} className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" {...register('password',{required: true,minLength: 8})} className="input" placeholder="Password" />
          {errors.password?.type === 'required' && <p className='text-red-700'>password is required</p>}
          {errors.password?.type === 'minLength' && <p className='text-red-700'>Password must be 8 characters </p>}
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
       </form>
    </div>
  )
}

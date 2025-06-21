import React from 'react'
import { useForm } from 'react-hook-form'

export default function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const onSubmit = data => {
        console.log(data);
        
    }
  return (
    <div>


    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-5xl font-bold">Register now!</h1>
      <div className="card-body">
     <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
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
     </form>
      </div>
    </div>
  </div>

  )
}

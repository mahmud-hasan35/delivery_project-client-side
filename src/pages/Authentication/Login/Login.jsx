import React from 'react'
import { useForm } from 'react-hook-form'
import UseAuth from '../../../Hook/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../SocialLogin/SocialLogin';

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signIn} = UseAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const form = location.state?.form || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
        .then(res => {
          console.log(res.user);
          navigate(form)
          
        })
        .catch(error => {
          console.log(error);
          
        })
        
    }
  return (
    <div>
       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-5xl font-bold p-2">Login now!</h1>
      <div className="card-body">
      
       <form onSubmit={handleSubmit(onSubmit)}>
         <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email')} className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" {...register('password',{required: true,minLength: 6})} className="input" placeholder="Password" />
          {errors.password?.type === 'required' && <p className='text-red-700'>password is required</p>}
          {errors.password?.type === 'minLength' && <p className='text-red-700'>Password must be 8 characters </p>}
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p><small>New o this website? <Link className='btn btn-link' to={'/register'}>Register</Link></small></p>
       </form>
       <SocialLogin></SocialLogin>
       
    </div>
    </div>
    </div>
  )
}

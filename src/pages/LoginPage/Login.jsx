import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Api/Auth';
import ForgetPassword from './ForgetPassword';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    setLoading(true);
    try {
      const response = await login(data);
      console.log(response);
      console.log(response.message);
      navigate('/dashboard');

      sessionStorage.setItem('token', response.token);
    } catch (error) {
      // console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className='h-screen w-screen flex justify-center items-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center px-4 md:px-8 lg:px-12 rounded-xl'
        >
          <div className='flex justify-center items-center'>
            <img src='/image 12.png' alt='' className='h-12' />
          </div>
          <div className='gap-6 pt-12 md:pt-16 lg:pt-20 flex flex-col justify-center items-center w-full'>
            <h1 className='font-semibold text-2xl md:text-3xl lg:text-4xl text-[#272828]'>
              Login
            </h1>
            <div className='flex flex-col gap-5 px-2'>
              <div className='bg-[#FAFAFA] flex items-center p-2 md:p-3 rounded-full shadow-md h-[50px] md:h-[55px] lg:h-[59px] w-full md:w-[360px] lg:w-[460px]'>
                <img src='/Frame 33.png' alt='' className='h-8 w-8' />
                <hr className='w-[1px] md:w-[2px] h-full  border-0 mx-1 md:mx-2' />
                <input
                  {...register('email', { required: true })}
                  type='email'
                  className='bg-transparent flex-1 text-nowrap h-full outline-none text-[#C2C3C3] text-sm md:text-base placeholder-[#C2C3C3] focus:bg-[#FAFAFA] focus:outline-none focus:fill-none'
                  placeholder='Email'
                />
              </div>
              {errors.email && (
                <span className='text-red-500 text-sm'>Email is required</span>
              )}

              <div className='bg-[#FAFAFA] flex items-center p-2 md:p-3 rounded-full shadow-md h-[50px] md:h-[55px] lg:h-[59px] w-full md:w-[360px] lg:w-[460px]'>
                <img src='/Frame 34.png' alt='' className='h-8 w-8' />
                <hr className='w-[1px] md:w-[2px] h-full bg-[#C2C3C3] border-0 mx-1 md:mx-2' />
                <input
                  {...register('password', { required: true })}
                  type='password'
                  className='flex-1 h-full outline-none bg-transparent  text-sm md:text-base'
                  placeholder='Password'
                />
                <img
                  src='/ion_eye-off.png'
                  alt=''
                  className='cursor-pointer h-5 w-5'
                />
              </div>
              {errors.password && (
                <span className='text-red-500 text-sm'>
                  Password is required
                </span>
              )}

              <h1
                className='text-right font-normal text-sm md:text-base text-[#FF2800] cursor-pointer'
                onClick={handleModalOpen}
              >
                Forgot password?
              </h1>
            </div>

            {errorMessage && (
              <span className='text-red-500 text-sm text-left'>
                {errorMessage}
              </span>
            )}

            <div className='p-3 md:p-5 w-full'>
              <button
                type='submit'
                className='h-[45px] md:h-[50px] lg:h-[55px] w-full text-sm md:text-base lg:text-lg text-white bg-[#FF2800] shadow-md rounded-full md:w-[320px] lg:w-[400px] xl:w-[459px] hover:bg-red-500'
                disabled={loading}
              >
                {loading ? (
                  <div className='animate-spin rounded-full mx-auto h-6 w-6 border-t-2 border-r-2 border-white'></div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Forgot Password Modal */}
      <ForgetPassword show={showModal} onClose={handleModalClose} />
    </>
  );
}

export default Login;

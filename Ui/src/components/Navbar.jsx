import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);
  console.log("the value of userData is", userData)
  const navigate = useNavigate();

  const logOut = async()=>{
    try{
      axios.defaults.withCredentials=true;
      const {data}= await axios.post(backendUrl+'/api/auth/logout');
      if(data.success){
        setIsLoggedin(false);
        setUserData(false);
      }
      else {
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }
  return (
    <div className="w-full fixed top-0 left-0 flex justify-between items-center p-4 sm:p-6 sm:px-24 bg-white z-50 shadow-md">
      <img src={assets.microsoftAuthenticator} alt="Logo" className="w-28 sm:w-32" />
      {userData ?
        <div className='w-8 h-8 flex justify-center items-center bg-black text-white relative group '>{userData.name[0].toUpperCase()}
          <div className=' absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isVerified ? <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li> : ''}
              <li onClick={logOut} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Log Out</li>
            </ul>
          </div> </div>
        :
        <button onClick={() => navigate('/login')} className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100">
          Login <img src={assets.arrow_icon} alt="" />
        </button>}

    </div>
  );
};

export default Navbar;

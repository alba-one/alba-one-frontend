import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useGetUserType = () => {
  const location = useLocation();
  const [userType, setUserType] = useState({
    type: '',
    isEmployee: false,
    userId: '',
  });

  const { type, isEmployee, userId } = userType;

  useEffect(() => {
    setUserType({
      type: localStorage.getItem('type') || '',
      isEmployee: localStorage.getItem('type') === 'employee',
      userId: localStorage.getItem('userId') || '',
    });
  }, [location.pathname]);

  return { type, isEmployee, userId };
};

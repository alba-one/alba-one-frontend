import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useGetUserType = () => {
  const location = useLocation();
  const [userType, setUserType] = useState({
    type: '',
    isEmployee: false,
  });

  const { type, isEmployee } = userType;

  useEffect(() => {
    setUserType({
      type: localStorage.getItem('type') || '',
      isEmployee: localStorage.getItem('type') === 'employee',
    });
  }, [location.pathname]);

  return { type, isEmployee };
};

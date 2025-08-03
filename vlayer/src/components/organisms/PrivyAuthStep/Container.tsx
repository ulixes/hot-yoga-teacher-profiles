import { usePrivy } from '@privy-io/react-auth';
import { PrivyAuthStepPresentational } from './Presentational';
import { useModal } from '../../../hooks/useModal';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

const usePrivyAuth = () => {
  const { login, logout, authenticated, user } = usePrivy();
  const { closeModal, showModal } = useModal();
  const navigate = useNavigate();

  const isAuthenticated = authenticated;

  const next = useCallback(() => {
    void navigate('/create-profile');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authenticateUser = async () => {
    await login();
    closeModal();
  };

  const logoutUser = async () => {
    await logout();
  };

  useEffect(() => {
    if (isAuthenticated) {
      showModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return {
    next,
    authenticateUser,
    logoutUser,
    isAuthenticated,
    user,
  };
};

export const PrivyAuthStep = () => {
  const { isAuthenticated, next, authenticateUser, logoutUser, user } = usePrivyAuth();
  return (
    <PrivyAuthStepPresentational
      isAuthenticated={isAuthenticated}
      next={next}
      authenticateUser={() => void authenticateUser()}
      logoutUser={() => void logoutUser()}
      userEmail={user?.email?.address || ''}
    />
  );
};
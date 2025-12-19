import { useOutletContext } from 'react-router';
import type { User } from '../../types/User';

// Une interface pour typer notre Contexte
type LayoutContextType = {
  currentUser: User | null;
};

// Le hook magique à utiliser dans les autres pages
export function useCurrentUser() {
  const { currentUser } = useOutletContext<LayoutContextType>();
  return currentUser;
}
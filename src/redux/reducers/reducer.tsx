import {OnboardingStatus, ToggleStatus} from '../types/types';

interface UserState {
  currentTheme: string;
  initialText: string;
  status: boolean;
}

const initialState: UserState = {
  currentTheme: 'Banjo',
  initialText: 'Welcome',
  status: false,
};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case ToggleStatus:
      return {
        ...state,
        currentTheme: payload ?? 'payload',
        initialText: payload ?? 'Welcome',
      };
    case OnboardingStatus:
      return {
        ...state,
        status: payload ?? true,
      };
    default:
      return state;
  }
};

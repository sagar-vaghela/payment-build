import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { authApi } from 'src/api/auth';
import type { User } from 'src/types/user';
import { Issuer } from 'src/utils/auth';

const ACCESS_TOKEN_KEY = 'access_token';
const USER_KEY = 'user';
const TOKEN_KEY = 'token';

interface Token {
  access_token : string,
  expires_in: string,
  refresh_token: string
}
interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  // access_token: string | null;
  token: Token; // ahi type nakhjo
}

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT'
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null; // ahi nakhjo types
    // access_token: string | null;
    token: Token // ahi nakhjo types
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    user: User; // ahi nakhjo types
    // access_token: string;
    token: Token // ahi nakhjo types
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action =
  | InitializeAction
  | SignInAction
  | SignOutAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: {
    access_token: '',
    expires_in:'',
    refresh_token :''
  },
  // access_token: null
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  SIGN_IN: (state: State, action: SignInAction): State => {
    const { user, token } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      token,
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state: State, action: Action): State => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export interface AuthContextType extends State {
  issuer: Issuer.Auth;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  issuer: Issuer.Auth,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve()
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(
    async (): Promise<void> => {
      try {
        const access_token = window.localStorage.getItem(ACCESS_TOKEN_KEY);
        const token = window.localStorage.getItem(TOKEN_KEY) ? JSON.parse(window.localStorage.getItem(TOKEN_KEY) || '') : '';
        const user: User | null =  window.localStorage.getItem(USER_KEY) ? JSON.parse(window.localStorage.getItem(USER_KEY) || '') : '';

        if (access_token && token && user) {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
              token,
            }
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
              token: {
                access_token: '',
                expires_in:'',
                refresh_token :''
              },
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
            token: {
              access_token: '',
              expires_in:'',
              refresh_token :''
            },
          }
        });
      }
    },
    [dispatch]
  );

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      const { access_token, user, token }: any = await authApi.signIn({ email, password });

      localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
      localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user,
          token
        }
      });
    },
    [dispatch]
  );

  const signOut = useCallback(
    async (): Promise<void> => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      dispatch({ type: ActionType.SIGN_OUT });
    },
    [dispatch]
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.Auth,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;

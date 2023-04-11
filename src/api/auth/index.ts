import type { User } from 'src/types/user';
import { createResourceId } from 'src/utils/create-resource-id';
import { wait } from 'src/utils/wait';
import { users } from './data';
import { createAxiosFor } from 'src/services/axios';
import { loginUrl } from 'src/services/api';

const ACCESS_TOKEN_KEY = 'access_token';
const USER_KEY = 'user';
const TOKEN_KEY = 'token';


// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = (): User[] => {
  try {
    const data = sessionStorage.getItem(ACCESS_TOKEN_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data) as User[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user: User): void => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

type SignInRequest = {
  email: string;
  password: string;
}

type SignInResponse = Promise<{
  user: User | null;
  access_token: string | null;
  token: any | null; // ahi type nakhjo
}>;

type SignUpRequest = {
  email: string;
  name: string;
  password: string;
}

type SignUpResponse = Promise<{
  access_token: string;
}>;

const { NEXT_PUBLIC_API_URL } = process.env;

class AuthApi {
  async signIn(request: SignInRequest): SignInResponse {
    const payload = {
      ...request,
      rememberMe: false
    }


    return new Promise((resolve, reject) => {
      try {
        // ane fix karo like below je error ave che
        // createAxiosFor.post(loginUrl, payload).then(function (response) {
        createAxiosFor.post(`https://europe-west1-tipsterpage-1a852.cloudfunctions.net/apiv1/auth/login`,payload).then(function (response) {
          const { payload: user, token, token: { access_token }}: any = response.data;
          resolve({ user, token, access_token });
        })

      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
 
  async signUp(request: SignUpRequest): SignUpResponse {
    const { email, name, password } = request;

    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Merge static users (data file) with persisted users (browser storage)
        const mergedUsers = [
          ...users,
          ...getPersistedUsers()
        ];

        // Check if a user already exists
        let user = mergedUsers.find((user) => user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: undefined,
          email,
          name,
          password,
          plan: 'Standard'
        };

        persistUser(user);

        // const access_token = sign(
        //   { userId: user.id },
        //   JWT_SECRET,
        //   { expiresIn: JWT_EXPIRES_IN }
        // );

        resolve({ access_token: '' });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();

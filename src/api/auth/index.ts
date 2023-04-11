import type { User } from 'src/types/user';
import { createResourceId } from 'src/utils/create-resource-id';
import { wait } from 'src/utils/wait';
import { users } from './data';
import { createAxiosFor } from 'src/services/axios';

const STORAGE_KEY: string = 'users';

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = (): User[] => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

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
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

type SignInRequest = {
  email: string;
  password: string;
}

type SignInResponse = Promise<{
  accessToken: string;
}>;

type SignUpRequest = {
  email: string;
  name: string;
  password: string;
}

type SignUpResponse = Promise<{
  accessToken: string;
}>;

type MeRequest = {
  accessToken: string
};

type MeResponse = Promise<User>;

class AuthApi {
  async signIn(request: SignInRequest): SignInResponse {
    const payload = {
      ...request,
      rememberMe: false
    }


    return new Promise((resolve, reject) => {
      try {
        createAxiosFor.post(`https://europe-west1-tipsterpage-1a852.cloudfunctions.net/apiv1/auth/login`,payload).then(function (response) {
          const { payload: user, token} = response.data;
          // Create the access token
          const accessToken: any = {
            user, token, access_token: token.access_token
          };

          // const accessToken: any = token.access_token;

          resolve({ accessToken });
        })

      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
 
  // async signIn(request: SignInRequest): SignInResponse {
  //   const { email, password } = request;

  //   await wait(500);

  //   return new Promise((resolve, reject) => {
  //     try {
  //       // Merge static users (data file) with persisted users (browser storage)
  //       const mergedUsers = [
  //         ...users,
  //         ...getPersistedUsers()
  //       ];

  //       // Find the user
  //       const user = mergedUsers.find((user) => user.email === email);

  //       if (!user || (user.password !== password)) {
  //         reject(new Error('Please check your email and password'));
  //         return;
  //       }

  //       // Create the access token
  //       const accessToken = sign(
  //         { userId: user.id },
  //         JWT_SECRET,
  //         { expiresIn: JWT_EXPIRES_IN }
  //       );

  //       resolve({ accessToken });
  //     } catch (err) {
  //       console.error('[Auth Api]: ', err);
  //       reject(new Error('Internal server error'));
  //     }
  //   });
  // }

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

        // const accessToken = sign(
        //   { userId: user.id },
        //   JWT_SECRET,
        //   { expiresIn: JWT_EXPIRES_IN }
        // );

        resolve({ accessToken: '' });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();

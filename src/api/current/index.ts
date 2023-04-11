import { userCurrentAPi } from 'src/services/api';

class CurrentApi {
  getCurrent() {
    return Promise.resolve(userCurrentAPi());
  }

}

export const currentAPI = new CurrentApi();

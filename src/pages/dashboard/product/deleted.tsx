import React, { useEffect } from 'react';
import type { Page as PageType } from 'src/types/page';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useAuth } from 'src/hooks/use-auth';
import { productsListAPI } from 'src/services/api';

const Page: PageType = () => {

  const auth = useAuth();


  useEffect(() => {
    const callApi = async () => {
      const productsList = await productsListAPI('deleted');
      console.log("productsList---response---", productsList);

    };
    if (auth?.token?.access_token) {
      callApi();
    }
  }, [auth.token.access_token]);

    return(
    
    <div>
      
      Deleted
      
      </div>
      
      )
}

Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

export default Page;
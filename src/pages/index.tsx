import { usePageView } from 'src/hooks/use-page-view';
import type { Page as PageType } from 'src/types/page';
import { paths } from 'src/paths';
import { useRouter } from 'src/hooks/use-router'
import { useEffect } from 'react';


const Page: PageType = () => {
  usePageView();

  const router = useRouter();

  useEffect(() => {
    router.push(paths.auth.login);
  }, []);
  

  return (
    <>
     
    </>
  );
};

export default Page;

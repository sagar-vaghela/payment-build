import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import { HomeCta } from 'src/sections/home/home-cta';
import { HomeFaqs } from 'src/sections/home/home-faqs';
import { HomeFeatures } from 'src/sections/home/home-features';
import { HomeHero } from 'src/sections/home/home-hero';
import { HomeReviews } from 'src/sections/home/home-reviews';
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
      {/* <Seo />
      <main>
        <HomeHero />
        <HomeFeatures />
        <HomeReviews />
        <HomeCta />
        <HomeFaqs />
      </main> */}
    </>
  );
};

// Page.getLayout = (page) => (
//   <MarketingLayout>
//     {page}
//   </MarketingLayout>
// );

export default Page;

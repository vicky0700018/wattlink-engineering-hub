import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '../components/wattlink/PublicSite';
export const Route = createFileRoute('/about')({
 
 head: () => ({meta:[{title:'About Wattlink'},{name:'description',content:'Integrated expertise, considered engineering and coordinated building systems.'},{property:'og:title',content:'About Wattlink'},{property:'og:description',content:'Integrated expertise, considered engineering and coordinated building systems.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}), component: Page
});
function Page() { return <AboutPage />; }

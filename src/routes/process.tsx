import { createFileRoute } from '@tanstack/react-router';
import { ProcessPage } from '../components/wattlink/PublicSite';
export const Route = createFileRoute('/process')({
 
 head: () => ({meta:[{title:'Our Process | Wattlink'},{name:'description',content:'From consultation to handover: a coordinated engineering approach.'},{property:'og:title',content:'Our Process | Wattlink'},{property:'og:description',content:'From consultation to handover: a coordinated engineering approach.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}), component: Page
});
function Page() { return <ProcessPage />; }

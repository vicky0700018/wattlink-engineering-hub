import { createFileRoute } from '@tanstack/react-router';
import { LegalPage } from '../components/wattlink/PublicSite';
export const Route = createFileRoute('/privacy')({
 
 head: () => ({meta:[{title:'Privacy Policy — Demo | Wattlink'},{name:'description',content:'Demo privacy information for Wattlink’s session-only website.'},{property:'og:title',content:'Privacy Policy — Demo | Wattlink'},{property:'og:description',content:'Demo privacy information for Wattlink’s session-only website.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}), component: Page
});
function Page() { return <LegalPage type="privacy" />; }

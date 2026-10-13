import { createFileRoute } from '@tanstack/react-router';
import { LegalPage } from '../components/wattlink/PublicSite';
export const Route = createFileRoute('/terms')({
 
 head: () => ({meta:[{title:'Terms of Use — Demo | Wattlink'},{name:'description',content:'Demo terms and illustrative content disclosures for Wattlink.'},{property:'og:title',content:'Terms of Use — Demo | Wattlink'},{property:'og:description',content:'Demo terms and illustrative content disclosures for Wattlink.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}), component: Page
});
function Page() { return <LegalPage type="terms" />; }

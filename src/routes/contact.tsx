import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '../components/wattlink/PublicSite';
export const Route = createFileRoute('/contact')({
 
 head: () => ({meta:[{title:'Contact Wattlink | Consultation'},{name:'description',content:'Discuss your building-services project with Wattlink Engineering and Consulting in Mumbai.'},{property:'og:title',content:'Contact Wattlink | Consultation'},{property:'og:description',content:'Discuss your building-services project with Wattlink Engineering and Consulting in Mumbai.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}), component: Page
});
function Page() { return <ContactPage />; }

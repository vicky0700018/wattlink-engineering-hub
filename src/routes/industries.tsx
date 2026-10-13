import { createFileRoute } from '@tanstack/react-router';
import { IndustriesPage } from '../components/wattlink/PublicSite';
export const Route = createFileRoute('/industries')({
 
 head: () => ({meta:[{title:'Industries | Wattlink'},{name:'description',content:'Engineering services for commercial, residential, office and industrial environments.'},{property:'og:title',content:'Industries | Wattlink'},{property:'og:description',content:'Engineering services for commercial, residential, office and industrial environments.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}), component: Page
});
function Page() { return <IndustriesPage />; }

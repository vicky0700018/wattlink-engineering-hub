import { createFileRoute } from '@tanstack/react-router';
import { ServicesPage } from '../components/wattlink/PublicSite';
export const Route = createFileRoute('/services')({
 validateSearch: (search: Record<string, unknown>) => ({service: typeof search.service === "string" ? search.service : undefined}),
 head: () => ({meta:[{title:'Wattlink Engineering Services'},{name:'description',content:'Explore electrical, plumbing, mechanical, fire protection, security and network services.'},{property:'og:title',content:'Wattlink Engineering Services'},{property:'og:description',content:'Explore electrical, plumbing, mechanical, fire protection, security and network services.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}), component: Page
});
function Page() { const search = Route.useSearch(); return <ServicesPage serviceId={search.service} />; }

import { createFileRoute } from '@tanstack/react-router';
import { Home } from '../components/wattlink/PublicSite';
export const Route = createFileRoute('/')({
 head: () => ({ meta: [
 {title:'Wattlink | Integrated Engineering & Consulting'},
 {name:'description',content:'Coordinated electrical, plumbing, mechanical, fire protection and smart infrastructure engineering in Mumbai.'},
 {property:'og:title',content:'Wattlink | Integrated Engineering & Consulting'},
 {property:'og:description',content:'Integrated engineering solutions for modern infrastructure.'},
 {property:'og:type',content:'website'},
 {name:'twitter:card',content:'summary_large_image'}
 ] }), component: Home,
});

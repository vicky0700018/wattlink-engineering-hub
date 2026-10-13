import { createFileRoute } from '@tanstack/react-router';
import { ProjectsPage } from '../components/wattlink/PublicSite';
export const Route = createFileRoute('/projects')({
 
 head: () => ({meta:[{title:'Wattlink Projects & Gallery'},{name:'description',content:'Illustrative engineering concepts and demo infrastructure gallery.'},{property:'og:title',content:'Wattlink Projects & Gallery'},{property:'og:description',content:'Illustrative engineering concepts and demo infrastructure gallery.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}), component: Page
});
function Page() { return <ProjectsPage />; }

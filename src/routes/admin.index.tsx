import { createFileRoute } from '@tanstack/react-router';
import { AdminDashboard } from '../admin/Admin';
export const Route = createFileRoute('/admin/')({
 head: () => ({meta:[{title:'Demo Content Workspace | Wattlink'},{name:'description',content:'Session-only Wattlink demo content management workspace.'},{property:'og:title',content:'Demo Content Workspace | Wattlink'},{property:'og:description',content:'Frontend-only demo workspace. Changes reset on refresh.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex,nofollow'}]}), component: AdminDashboard
});

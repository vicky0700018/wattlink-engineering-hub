import { createFileRoute } from '@tanstack/react-router';
import { AdminLogin } from '../admin/Admin';
export const Route = createFileRoute('/admin/login')({
 head: () => ({meta:[{title:'Demo Admin Login | Wattlink'},{name:'description',content:'Session-only Wattlink demo content management workspace.'},{property:'og:title',content:'Demo Admin Login | Wattlink'},{property:'og:description',content:'Frontend-only demo workspace. Changes reset on refresh.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex,nofollow'}]}), component: AdminLogin
});

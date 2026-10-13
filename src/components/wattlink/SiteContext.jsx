import {createContext,useContext,useState,useEffect} from 'react';
import * as data from '../../data/siteData';
const SiteContext=createContext(null);
export function SiteProvider({children}) {
 const [company,setCompany]=useState(data.initialCompany);
 const [services,setServices]=useState(data.initialServices);
 const [projects,setProjects]=useState(data.initialProjects);
 const [industries,setIndustries]=useState(data.initialIndustries);
 const [gallery,setGallery]=useState(data.initialGallery);
 const [process,setProcess]=useState(data.initialProcess);
 const [navigation,setNavigation]=useState(data.initialNavigation);
 const [footerLinks,setFooterLinks]=useState(data.initialFooterLinks);
 const [homepage,setHomepage]=useState(data.initialHomepage);
 const [settings,setSettings]=useState(data.initialSettings);
 const [inquiries,setInquiries]=useState([]);
 const [demoAccess,setDemoAccess]=useState(false);
 useEffect(()=>{const root=document.documentElement; for(const [key,variable] of [['primaryColor','--primary'],['navyColor','--navy'],['cyanColor','--cyan'],['orangeColor','--orange']])if(/^#[0-9a-f]{6}$/i.test(settings[key]))root.style.setProperty(variable,settings[key]);},[settings]);
 return <SiteContext.Provider value={{company,setCompany,services,setServices,projects,setProjects,industries,setIndustries,gallery,setGallery,process,setProcess,navigation,setNavigation,footerLinks,setFooterLinks,homepage,setHomepage,settings,setSettings,inquiries,setInquiries,demoAccess,setDemoAccess}}>{children}</SiteContext.Provider>;
}
export function useSite(){const value=useContext(SiteContext);if(!value)throw new Error('SiteProvider is required');return value;}

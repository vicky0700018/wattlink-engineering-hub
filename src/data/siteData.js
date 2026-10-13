import hero from '../assets/hero-engineering.jpg';
import s1 from '../assets/services-1.jpg';
import s2 from '../assets/services-2.jpg';
import s3 from '../assets/services-3.jpg';
import s4 from '../assets/services-4.jpg';
import s5 from '../assets/services-5.jpg';
import s6 from '../assets/services-6.jpg';
import p1 from '../assets/projects-1.jpg';
import p2 from '../assets/projects-2.jpg';
import p3 from '../assets/projects-3.jpg';
import p4 from '../assets/projects-4.jpg';
import p5 from '../assets/projects-5.jpg';
import p6 from '../assets/projects-6.jpg';
import i1 from '../assets/industries-1.jpg';
import i2 from '../assets/industries-2.jpg';
import i3 from '../assets/industries-3.jpg';
import i4 from '../assets/industries-4.jpg';
import i5 from '../assets/industries-5.jpg';
import i6 from '../assets/industries-6.jpg';
export const initialCompany = {
 name: 'WATTLINK ENGINEERING AND CONSULTING PRIVATE LIMITED',
 description: 'Wattlink brings building systems together. We provide coordinated engineering and technical services for the infrastructure that powers, connects and protects modern spaces.',
 address: 'D1/1-204 Yamuna Nagar CHS, Millat Nagar, Andheri West, Mumbai, Maharashtra, 400053, India.',
 phone: '+91 5524555552', email: 'supportwattlink@.com',
 vision: 'To help shape connected, efficient and thoughtfully engineered spaces.',
 mission: 'To deliver practical, coordinated building-services solutions through clear communication and quality-focused execution.',
 values: 'Technical integrity\nSafety-conscious planning\nClear communication\nClient-focused support',
 whyChoose: 'A coordinated approach. A dependable engineering partner.',
 footerDescription: 'Integrated engineering. Connected infrastructure. Practical solutions for the spaces of tomorrow.',
 footerCredit: 'Designed and development by SOSynch Ai Tech',
};
const service = (id,title,category,image,description,capabilities) => ({id,title,category,image,description,capabilities,published:true});
export const initialServices = [
 service('electrical','Electrical Engineering','Electrical',s1,'Thoughtfully planned electrical systems that power buildings with efficiency and reliability.','Electrical planning\nPower distribution & installations\nLighting systems\nCoordination & maintenance support'),
 service('plumbing','Plumbing Systems','Plumbing',s2,'Coordinated water distribution and drainage solutions for the everyday demands of modern buildings.','Water distribution\nDrainage systems\nPiping coordination\nPlumbing installation'),
 service('mechanical','Mechanical Engineering','Mechanical',s3,'Practical mechanical systems that keep buildings comfortable, functional and operating smoothly.','HVAC coordination\nEquipment installation\nVentilation planning\nMechanical infrastructure'),
 service('fire','Fire Safety & Protection','Fire Safety',s4,'Safety-conscious planning and coordinated fire protection infrastructure for built environments.','Fire protection coordination\nFire alarm integration\nSprinkler infrastructure\nInstallation support'),
 service('barcode','Barcode-Based Entry Systems','Security Systems',p5,'Smarter visitor entry, with barcode-enabled identification and controlled access workflows.','Barcode-enabled visitor entry\nIdentification workflows\nAccess verification\nControlled entry integration'),
 service('network','Wi-Fi & Network Infrastructure','Networks',s5,'Connected workplaces with considered coverage, structured cabling and dependable network infrastructure.','Wi-Fi coverage planning\nNetwork connectivity\nStructured cabling\nConnectivity infrastructure'),
 service('security','Security & Access Control','Security Systems',s6,'Connected security systems for controlled entry and better visibility across your building.','Access control\nEntry monitoring\nSecurity system integration\nCompatible CCTV infrastructure'),
];
export const initialProjects = [
 ['Commercial Electrical Infrastructure','Electrical',p1,'Coordinated power distribution and lighting planning for a contemporary commercial building.'],
 ['Residential Plumbing Systems','Plumbing',p2,'Water supply, drainage and piping coordination for a residential development.'],
 ['Mechanical & HVAC Coordination','Mechanical',p3,'Equipment layouts, ventilation and HVAC coordination for a commercial rooftop plant.'],
 ['Fire Protection Infrastructure','Fire Safety',p4,'Fire protection installation planning and integration in a building parking area.'],
 ['Barcode-Based Access Systems','Security Systems',p5,'A controlled-entry concept connecting visitor identification with modern lobby turnstiles.'],
 ['Wi-Fi & Network Infrastructure','Networks',p6,'A structured connectivity concept for commercial network distribution.'],
].map(([title,category,image,description],index)=>({id:`project-${index+1}`,title,category,image,description,location:'Illustrative project — location not specified',status:'Concept / demo',gallery: image+'\n'+[s1,s2,s3,s4,s6,s5][index],published:true}));
export const initialIndustries = ['Commercial Buildings','Residential Developments','Office Spaces','Retail & Commercial Complexes','Industrial Facilities','Hospitality & Institutional Buildings'].map((title,index)=>({id:`industry-${index+1}`,title,image:[i1,i2,i3,i4,i5,i6][index],description:['Integrated systems for contemporary commercial infrastructure.','Considered building services for modern living.','Connected, comfortable and functional workplaces.','Coordinated infrastructure for busy commercial environments.','Practical technical systems for industrial operations.','Thoughtfully engineered environments for people and guests.'][index],published:true}));
export const initialProcess = ['Initial Consultation','Requirement Assessment','Technical Planning','Coordination & Execution','Quality Review','Handover & Ongoing Support'].map((title,index)=>({id:`step-${index}`,title,description:['We start with a conversation about your project and priorities.','We assess the site, scope and technical needs together.','Coordinated systems and practical plans take shape.','We align disciplines and support considered execution.','We review the work against agreed project requirements.','Clear handover and ongoing technical support.'][index],published:true}));
export const initialGallery = initialProjects.map((p,index)=>({id:`gallery-${index}`,title:p.title,description:p.description,image:p.image,category:p.category,published:true}));
export const initialNavigation = [['Home','/'],['About Us','/about'],['Services','/services'],['Projects','/projects'],['Industries','/industries'],['Our Process','/process'],['Contact Us','/contact']].map(([label,target],i)=>({id:`nav-${i}`,label,target,published:true}));
export const initialHomepage = {headline:'Integrated Engineering Solutions for Modern Infrastructure',description:'Wattlink Engineering and Consulting delivers coordinated electrical, plumbing, mechanical, fire protection and smart security solutions for modern buildings and infrastructure.',image:hero,primaryLabel:'Explore Our Services',secondaryLabel:'Request a Consultation',aboutText:'Behind every well-built space is a network of systems working together. At Wattlink, we bring those systems into focus — with integrated engineering, careful coordination and a practical understanding of your project.',aboutImage:i3,featuredServices:'electrical,plumbing,mechanical',featuredProjects:'project-1,project-2,project-3',showAbout:true,showServices:true,showProjects:true,showIndustries:true,showProcess:true};
export const initialSettings = {websiteTitle:'Wattlink | Engineering & Consulting',logoText:'WATTLINK',primaryColor:'#1769AA',navyColor:'#10243A',cyanColor:'#00B8D9',orangeColor:'#F28C28',creditVisible:true,adminLabel:'Admin Login',defaultCategory:'Electrical',showConsultation:true};
export const initialFooterLinks = [{id:'footer-1',label:'Privacy Policy (demo)',target:'/privacy',published:true},{id:'footer-2',label:'Terms (demo)',target:'/terms',published:true}];
export const routes = ['/', '/about', '/services', '/projects', '/industries', '/process', '/contact', '/privacy', '/terms'];
export const categories = ['All','Electrical','Plumbing','Mechanical','Fire Safety','Security Systems','Networks'];
export const fallbackImage = hero;

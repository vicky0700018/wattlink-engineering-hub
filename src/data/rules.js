export const visibleEntries = entries => entries.filter(entry => entry.published);
export const moveEntry = (entries,id,direction) => {
 const index=entries.findIndex(entry=>entry.id===id); const target=index+direction;
 if(index<0||target<0||target>=entries.length)return entries;
 const next=[...entries]; [next[index],next[target]]=[next[target],next[index]]; return next;
};
export const validEmail = email => typeof email==='string' && email.length<=255 && /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email);
export const validImage = value => typeof value==='string' && value.length<=2000 && (value.startsWith('/') && !value.startsWith('//') || /^https:\/\/[^\s]+$/i.test(value));
export const validateInquiry = values => {
 const errors={};
 for(const field of ['name','email','phone','service','location','details'])if(!String(values[field]||'').trim())errors[field]='This field is required.';
 if(values.email&&!validEmail(values.email))errors.email='Enter a valid email address.';
 if(values.phone&&!/^[+\d\s().-]{7,25}$/.test(values.phone))errors.phone='Enter a valid phone number.';
 for(const [key,value] of Object.entries(values))if(String(value).length>(key==='details'?2000:255))errors[key]='Please shorten this field.';
 return errors;
};

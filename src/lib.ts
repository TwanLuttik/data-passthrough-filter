import { errors } from './validation';

export const lengthCheck = (key: any, value: any, rule: any): any => {
  // filter for blacklisted properties 
  if (typeof value === 'object') return;
  
  if (value.length < rule.length?.min) {
    errors.push({ key, value, desc: `The minimun required length is ${rule.length.min}` });
    // continue;
  } 
  if (value.length > rule.length?.max) {
    errors.push({ key, value, desc: `The maximun required length is ${rule.length.max}` });
    // continue;
  }
}
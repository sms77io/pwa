export const toString = (v: any): string => 'object' === typeof v ? JSON.stringify(v) : v;
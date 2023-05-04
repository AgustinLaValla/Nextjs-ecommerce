import JSCookie from 'js-cookie';

export const Cookie = {
  set: (name: string, value: string, options?: any) => JSCookie.set(name, value, options),
  get: () => JSCookie.get(),
  remove: (name: string, options: any) => JSCookie.remove(name, options)
}
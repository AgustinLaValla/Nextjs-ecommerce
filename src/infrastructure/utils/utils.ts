export const parseHttpBody = (body: { [key: string]: any } | string | null | undefined) => {
  if (typeof body === 'string') {
    return JSON.parse(body);
  }

  return body;
}
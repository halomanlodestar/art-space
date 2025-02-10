// Append a random code to the slug to make it unique

export const generateSlug = (title: string, includeNumber: boolean = true) => {
  if (includeNumber) {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .concat(`-${Math.random().toString(36).substr(2, 9)}`);
  }

  return title.toLowerCase().replace(/ /g, '-');
};

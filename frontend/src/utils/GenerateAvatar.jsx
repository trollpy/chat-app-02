// Fixed avatar generator with your specific API endpoints
const generateDiceBearNotionists = (seed) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}`;
const generateDiceBearInitials = (seed) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${seed}`;
const generateDiceBearLorelei = (seed) =>
  `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}`;

export const generateAvatar = () => {
  const data = [];
  
  // Generate 2 notionists avatars
  for (let i = 0; i < 2; i++) {
    const res = generateDiceBearNotionists(Math.random());
    data.push(res);
  }
  
  // Generate 2 initials avatars
  for (let i = 0; i < 2; i++) {
    const res = generateDiceBearInitials(Math.random());
    data.push(res);
  }
  
  // Generate 2 lorelei avatars
  for (let i = 0; i < 2; i++) {
    const res = generateDiceBearLorelei(Math.random());
    data.push(res);
  }
  
  return data;
};

// Alternative: Generate exactly 8 avatars with mixed styles
export const generateEightAvatars = () => {
  const styles = ['notionists', 'initials', 'lorelei'];
  const data = [];
  
  for (let i = 0; i < 8; i++) {
    const styleIndex = i % styles.length;
    const style = styles[styleIndex];
    const seed = Math.random();
    const url = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
    data.push(url);
  }
  
  return data;
};

// If you want more control over the distribution of avatar types
export const generateCustomAvatars = () => {
  const data = [];
  
  // 3 notionists
  for (let i = 0; i < 3; i++) {
    data.push(generateDiceBearNotionists(Math.random()));
  }
  
  // 3 initials
  for (let i = 0; i < 3; i++) {
    data.push(generateDiceBearInitials(Math.random()));
  }
  
  // 2 lorelei
  for (let i = 0; i < 2; i++) {
    data.push(generateDiceBearLorelei(Math.random()));
  }
  
  return data;
};
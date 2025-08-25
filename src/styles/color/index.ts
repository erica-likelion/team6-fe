export const grayColorMap = {
  'gray-900': '#272725',
  'gray-800': '#3D3C39',
  'gray-700': '#51504B',
  'gray-600': '#6C6B62',
  'gray-500': '#86857C',
  'gray-400': '#9D9C93',
  'gray-300': '#B9B8AE',
  'gray-200': '#DAD9D1',
  'gray-100': '#EDECE7',
  'gray-50': '#F7F6F1',
};

export const ColorMap = {
  red: '#FF5145',
  'primary-green': '#4DDB6D',
  'secondary-green': '#B5EAA7',
  'tertiary-green': '#E4F1DB',
  'primary-bg': '#F7F6F1',
  'empahsis-green': '#1EB065'
};

export const blackColorMap = { black: '#161616' };

export const whiteColorMap = { white: '#ffffff' };

export const colorMap = {
  ...grayColorMap,
  ...ColorMap,
  ...whiteColorMap,
  ...blackColorMap,
};

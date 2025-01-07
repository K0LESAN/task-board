module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(test).ts?(x)'],
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$',
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$',
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$',
  ],
  rootDir: './',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileMock.js',
    '\\.(css|scss|sass)$': '<rootDir>/styleMock.js',
    '@/(.*)': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
};

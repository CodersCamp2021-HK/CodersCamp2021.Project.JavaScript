const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['./src/**/{!(index),}.js'],
  moduleNameMapper: {
    '^.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(png|jpg|jpeg|gif|webp|mp4|mp3|svg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = config;

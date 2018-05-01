module.exports = {
    setupFiles: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/src/.next/', '<rootDir>/node_modules/'],
    transform: {
        "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    transformIgnorePatterns: [
        "node_modules"
    ],
    moduleDirectories: [
        ".",
        "node_modules"
    ],
    roots: [
        "test"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/node_modules/**",
        "!**/*.d.*"
    ],
    coverageDirectory: "<rootDir>/coverage/",
    coverageReporters: ["text-summary", "html"],
    testRegex: "(/.*(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
    moduleNameMapper: {
        "(.scss|.png|.jpg|.svg)$": "<rootDir>/__mocks__/moduleMock.js",
        "next/config": "<rootDir>/__mocks__/nextConfig.js",
        "next/router": "<rootDir>/__mocks__/nextRouter.js"
    },
    globals: {
        "ts-jest": {
            tsConfigFile: "tsconfig.test.json"
        },
    }
}
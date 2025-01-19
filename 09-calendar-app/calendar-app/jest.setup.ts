import '@testing-library/jest-dom';

import fetch from 'cross-fetch';
global.fetch = fetch;
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

import '@testing-library/jest-dom';

import fetch from 'cross-fetch';
global.fetch = fetch;
require('dotenv').config({
    path: '.env'
})

jest.mock('@/globals/helpers/getEnviroments', ()=>({
    getEnviroments: ()=>({...process.env})
}))

import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
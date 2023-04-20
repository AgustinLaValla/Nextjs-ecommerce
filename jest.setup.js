import '@testing-library/jest-dom/extend-expect'

//polyfill necessary for jsdom test environment
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
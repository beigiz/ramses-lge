import 'jest-canvas-mock';
import '@testing-library/jest-dom'; // jest custom assertions

import { Readable } from 'stream';
import { TextDecoder, TextEncoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.ReadableStream = Readable as unknown as typeof globalThis.ReadableStream;
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

const mock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
};

// @ts-ignore
global.IntersectionObserver = mock;

// JSDOM-based interactive event simulation test
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
});

(global as any).window = dom.window;
(global as any).document = dom.window.document;
(global as any).navigator = dom.window.navigator;
(global as any).HTMLElement = dom.window.HTMLElement;
(global as any).PointerEvent = dom.window.PointerEvent;
(global as any).matchMedia = dom.window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock IntersectionObserver
(global as any).IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

console.log('JSDOM Environment initialized successfully.');

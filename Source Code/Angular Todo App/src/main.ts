/**
 * ================================================================================
 * FILE: main.ts
 * PROJECT: JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * ARCHITECTS: Amey Thakur (https://github.com/Amey-Thakur)
 *            Mega Satish (https://github.com/msatmod)
 * REPOSITORY: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * RELEASE DATE: June 23, 2022
 * LICENSE: MIT License
 * --------------------------------------------------------------------------------
 * TECHNICAL DESCRIPTION:
 * The primary bootstrap entry point for the Angular ecosystem. This file 
 * orchestrates the application's initialization sequence using the 
 * bootstrapApplication API. It serves as the bridge between the browser 
 * environment and the Angular runtime, ensuring dependency injection 
 * configurations are provisioned before component hydration.
 * ================================================================================
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config';

bootstrapApplication(AppComponent, config)
  .catch((err) => console.error(err));

// Security and Easter Egg Logic
(function () {
  // 1. Anti-Right-Click
  document.addEventListener('contextmenu', e => e.preventDefault());

  // 2. Shortcut Protection
  document.addEventListener('keydown', e => {
    if ((e as any).keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && ((e as any).keyCode === 73 || (e as any).keyCode === 74)) || // Ctrl+Shift+I/J
      (e.ctrlKey && (e as any).keyCode === 85) // Ctrl+U
    ) {
      e.preventDefault();
    }
  });

  // 3. Console Message
  console.log(
    '%c Created by Amey Thakur & Mega Satish ',
    'background: #324fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 128 128\'%3E%3Cg id=\'surface1\'%3E%3Cpath style=\' stroke:none;fill-rule:nonzero;fill:rgb(86.666667%25,0%25,19.215686%25);fill-opacity:1;\' d=\'M 64 15.359375 L 16.332031 32.359375 L 23.601562 95.386719 L 64 117.761719 L 104.398438 95.386719 L 111.667969 32.359375 Z M 64 15.359375 \'/%3E%3Cpath style=\' stroke:none;fill-rule:nonzero;fill:rgb(76.470588%25,0%25,18.431373%25);fill-opacity:1;\' d=\'M 64 15.359375 L 64 26.726562 L 64 26.675781 L 64 117.761719 L 104.398438 95.386719 L 111.667969 32.359375 Z M 64 15.359375 \'/%3E%3Cpath style=\' stroke:none;fill-rule:nonzero;fill:rgb(100%25,100%25,100%25);fill-opacity:1;\' d=\'M 64 26.675781 L 34.203125 93.492188 L 45.3125 93.492188 L 51.300781 78.539062 L 76.59375 78.539062 L 82.585938 93.492188 L 93.695312 93.492188 Z M 72.703125 69.324219 L 55.296875 69.324219 L 64 48.382812 Z M 72.703125 69.324219 \'/%3E%3C/g%3E%3C/svg%3E") no-repeat 8px center; background-size: 22px 22px; color: #fff; font-size: 20px; font-weight: bold; border-radius: 5px; padding: 10px 10px 10px 35px;'
  );
  console.log('%c Angular: The platform for building the future. ', 'color: #324fff; font-style: italic;');
  console.log('%c GitHub Repo: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS ', 'color: #3b82f6; text-decoration: underline;');
  console.log('%c Amey Thakur: https://github.com/Amey-Thakur ', 'color: #64748b;');
  console.log('%c Mega Satish: https://github.com/msatmod ', 'color: #64748b;');
  console.log('%c 💡 Scholarly Insight: Angular\'s architecture is predicated on the principle of \'Separation of Concerns\' through its hierarchical dependency injection and declarative templates. By utilizing Zone.js for change detection, it creates a robust, bi-directional data flow that minimizes manual DOM synchronization, facilitating the development of complex, enterprise-scale SPAs. ', 'color: #0f172a; background: #f1f5f9; padding: 4px; border-left: 4px solid #324fff; margin-top: 4px; font-family: "Play", sans-serif;');

  // 4. Easter Egg (AMEYMEGA)
  let sequence = '';
  const secret = 'AMEYMEGA';
  document.addEventListener('keydown', e => {
    sequence += e.key.toUpperCase();
    if (sequence.endsWith(secret)) {
      alert('🌟 Easter Egg Found! 🌟\n\nThis application was meticulously crafted by Amey Thakur & Mega Satish using Angular.\n\nThank you for exploring our JS Framework Ecosystem!');
      sequence = '';
    }
    if (sequence.length > 20) sequence = sequence.substring(sequence.length - 20);
  });
})();

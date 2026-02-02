/**
 * ================================================================================
 * FILE: main.js
 * PROJECT: JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * ARCHITECTS: Amey Thakur (https://github.com/Amey-Thakur)
 *            Mega Satish (https://github.com/msatmod)
 * REPOSITORY: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * RELEASE DATE: June 23, 2022
 * LICENSE: MIT License
 * --------------------------------------------------------------------------------
 * TECHNICAL DESCRIPTION:
 * The bootstrap entry point for the Svelte implementation. This file defines 
 * the mount sequence for the root App component, initializing the Svelte 
 * compiler-integrated runtime within the targeted DOM workspace.
 * ================================================================================
 */

import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {
	target: document.getElementById('app'),
});

export default app;
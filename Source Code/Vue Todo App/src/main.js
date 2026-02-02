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
 * The bootstrap entry point for the Vue implementation. This file defines 
 * the mount sequence for the root application component, initializing 
 * the Vue reactive system within the targeted #app workspace.
 * ================================================================================
 */

import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

createApp(App).mount('#app');

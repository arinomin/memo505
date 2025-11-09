# RC505mk2 エフェクトメモ (Effect Preset Manager)

## Overview
This is a single-page web application for RC505mk2 looper artists to manage and store effect presets. The app helps users document complex effect settings (INPUT/TRACK FX with parameters) digitally instead of paper notes.

## Project Architecture
- **Type**: Static single-page application
- **Framework**: React 18 (loaded via CDN)
- **Storage**: LocalStorage (client-side only, no backend)
- **Language**: Japanese interface
- **File Structure**: Single `index.html` file with embedded CSS and JavaScript

## Key Features
1. **Preset Creation**: Create effect presets for INPUT FX or TRACK FX
2. **Effect Slots**: Configure 4 effect slots (FX A, B, C, D) per preset
3. **Dynamic Parameters**: Auto-display parameters based on selected effect
4. **Preset Management**: Save, edit, duplicate, and delete presets
5. **Search**: Filter saved presets by name

## Technical Details
- Uses React Hooks (useState, useEffect, useMemo)
- Custom hook for LocalStorage persistence
- Supports 55 different effects with unique parameter sets
- Sequencer parameters auto-added for 15 specific effects
- No build process required - runs directly in browser

## Recent Changes
- **2025-11-09**: Initial import and Replit setup
  - Configured workflow to serve on port 5000
  - Added deployment configuration
  - Project ready to run

## Dependencies
None - all dependencies loaded via CDN (React 18, Babel standalone)

## Running the Project
The app runs on a simple HTTP server on port 5000. No compilation or build steps needed.

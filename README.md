# Causal Graph Visualizer

An interactive tool for visualizing and editing causal graphs.
Available as both a **desktop application** and a **web application**.

---

## Try it Online

[Web version](https://causal-graph-visualizer-014f12.pages.imims.de/)

---

## Download Desktop App

Download the latest version for your operating system from the [Releases](../../releases) page:

- **Windows**: `.exe` installer
- **macOS**: `.dmg` package
- **Linux**: `.AppImage`

---

## Features

- Interactive graph creation and editing
- Import **CSV matrices** (supports PAGs, ADMGs, and subsets) and **JSON graphs** (with visualization metadata)
- Edit node and edge properties
- Undo/Redo functionality
- Grid view and alignment tools (snap nodes/edges to grid when enabled)
- Export as **PDF, PNG, CSV matrix, or JSON graph**
- Keyboard shortcuts for efficient workflow + buttons for most actions
- Works offline (desktop version)

---

## Quick Start

### Desktop App
1. Download the installer for your OS
2. Install and launch the application
3. Left-click on the canvas and press **`Ctrl+Alt+N`** to add your first node
   - Alternatively, import a CSV matrix or JSON graph (see [File Formats](#-file-formats))

### Web Version
1. Visit the [web application](https://causal-graph-visualizer-014f12.pages.imims.de/)
2. Left-click on the canvas and press **`Ctrl+Alt+N`** to add your first node
   - Alternatively, import a CSV matrix or JSON graph (see [File Formats](#-file-formats))
3. Start building your causal graph!

---

## Keyboard Shortcuts & Buttons

| Action | Button | Shortcut |
|--------|--------|----------|
| Import CSV Matrix | Yes | – |
| Import JSON Graph | Yes | – |
| Undo | Yes | **Ctrl+Z** |
| Redo | Yes | **Ctrl+Y** |
| Add Node | Yes | **Ctrl+Alt+N** (opens popup to enter name) |
| Add Link | No | **Ctrl+Alt+LeftClick** on two nodes |
| Multi-select Nodes | No | **Ctrl+Drag** |
| Multi-select Edges | No | **Ctrl+Shift+Drag** |
| Delete Selection | Yes | **Delete** |
| Toggle Grid & Clipping | Yes | **Alt+G** |
| Export CSV Matrix | Yes | – |
| Export JSON Graph | Yes | – |
| Export PDF | Yes | – |
| Export PNG | Yes | (popup: DPI & transparent background) |

---

## Development

### Prerequisites
- [Node.js 18+](https://nodejs.org/)
- npm

### Setup
```bash
git clone https://github.com/erikwhisper/causal-graph-visualizer.git
cd causal-graph-visualizer
npm install


### Development Commands
npm run dev          # Web development server
npm run electron:dev # Electron development
npm run build        # Build web version
npm run dist         # Build desktop installers

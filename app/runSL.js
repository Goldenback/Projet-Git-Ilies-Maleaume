const pty = require('node-pty')

// Get the screen size
const screenSize = {
  width: process.stdout.columns || 80,
  height: process.stdout.rows || 24
}

// Calculate the center position
const centerX = Math.floor((screenSize.width - 120) / 2)
const centerY = Math.floor((screenSize.height - 40) / 2)

// Create a new pty instance
const term = pty.spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
  name: 'xterm-256color',
  cols: 120,
  rows: 40,
  cwd: process.cwd(),
  env: process.env,
  // Position the terminal in the center
  x: centerX,
  y: centerY
})

// Resize the terminal (optional)
term.resize(120, 40)

// Handle data events (optional)
term.onData(data => {
  console.log(data)
})

// Spawn the "sl" command
term.write('sl\n')

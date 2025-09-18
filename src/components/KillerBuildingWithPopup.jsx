import { useState, useEffect } from 'react'

/**
 * CodeEditorPopup Component
 * 
 * A popup that includes a code editor interface for writing code.
 * 
 * @param {boolean} isVisible - Whether the popup should be displayed
 * @param {string} color - The color theme for the popup
 * @param {string} title - The popup title
 * @param {string} initialCode - Initial code content
 * @param {Function} onClose - Function to call when popup is closed
 * @param {Function} onCodeChange - Function to call when code changes
 * @returns {JSX.Element} Styled popup with code editor
 */
function CodeEditorPopup({ isVisible, color, title, initialCode = '', onClose, onCodeChange }) {
	const [code, setCode] = useState(initialCode)

	if (!isVisible) return null

	const popupStyle = {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: '#1e1e1e',
		color: '#ffffff',
		padding: '20px',
		borderRadius: '10px',
		boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
		zIndex: 1000,
		width: '600px',
		height: '500px',
		fontFamily: 'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
		border: `3px solid ${color}`,
		boxShadow: `0 0 20px ${color}40`,
		display: 'flex',
		flexDirection: 'column'
	}

	const headerStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '15px',
		paddingBottom: '10px',
		borderBottom: `2px solid ${color}`
	}

	const closeButtonStyle = {
		background: 'none',
		border: 'none',
		color: '#ffffff',
		fontSize: '24px',
		cursor: 'pointer',
		fontWeight: 'bold',
		padding: '5px 10px',
		borderRadius: '5px',
		transition: 'background-color 0.2s'
	}

	const textareaStyle = {
		flex: 1,
		backgroundColor: '#2d2d2d',
		color: '#ffffff',
		border: `1px solid ${color}`,
		borderRadius: '5px',
		padding: '15px',
		fontSize: '14px',
		fontFamily: 'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
		lineHeight: '1.5',
		resize: 'none',
		outline: 'none',
		tabSize: 2
	}

	const buttonStyle = {
		backgroundColor: color,
		color: '#ffffff',
		border: 'none',
		padding: '10px 20px',
		borderRadius: '5px',
		cursor: 'pointer',
		fontSize: '14px',
		fontWeight: 'bold',
		marginTop: '10px',
		transition: 'opacity 0.2s'
	}

	const handleCodeChange = (e) => {
		const newCode = e.target.value
		setCode(newCode)
		if (onCodeChange) {
			onCodeChange(newCode)
		}
	}

	const handleClose = (e) => {
		e.preventDefault()
		e.stopPropagation()
		onClose()
	}

	return (
		<div style={popupStyle}>
			<div style={headerStyle}>
				<h2 style={{ margin: 0, fontSize: '20px', color: color }}>{title}</h2>
				<button 
					style={closeButtonStyle} 
					onClick={handleClose}
					onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
					onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
					type="button"
				>
					×
				</button>
			</div>
			
			<textarea
				style={textareaStyle}
				value={code}
				onChange={handleCodeChange}
				placeholder="// Write your code here..."
				spellCheck={false}
			/>
			
			<div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
				<button 
					style={buttonStyle}
					onMouseOver={(e) => e.target.style.opacity = '0.8'}
					onMouseOut={(e) => e.target.style.opacity = '1'}
				>
					Run Code
				</button>
				<button 
					style={{...buttonStyle, backgroundColor: '#666'}}
					onMouseOver={(e) => e.target.style.opacity = '0.8'}
					onMouseOut={(e) => e.target.style.opacity = '1'}
				>
					Save
				</button>
			</div>
		</div>
	)
}

/**
 * KillerBuildingWithPopup Component
 * 
 * Component that manages popup state and provides code editor functionality
 * for the KillerBuilding3D component. Listens for window click events from the 3D scene.
 */
export default function KillerBuildingWithPopup() {
	const [activePopup, setActivePopup] = useState(null)
	const [codeContent, setCodeContent] = useState('')

	// Listen for window click events from the 3D scene
	useEffect(() => {
		const handleWindowClick = (event) => {
			const windowId = event.detail
			setActivePopup(windowId)
			const config = windowConfigs[windowId]
			if (config) {
				setCodeContent(config.initialCode)
			}
		}

		window.addEventListener('windowClick', handleWindowClick)
		return () => {
			window.removeEventListener('windowClick', handleWindowClick)
		}
	}, [])

	const handleClosePopup = () => {
		setActivePopup(null)
	}

	const handleCodeChange = (newCode) => {
		setCodeContent(newCode)
	}

	return (
		<>
			{Object.entries(windowConfigs).map(([windowId, config]) => (
				<CodeEditorPopup
					key={windowId}
					isVisible={activePopup === windowId}
					color={config.color}
					title={config.title}
					initialCode={config.initialCode}
					onClose={handleClosePopup}
					onCodeChange={handleCodeChange}
				/>
			))}
		</>
	)
}

// Window configurations moved outside component to prevent recreation on every render
const windowConfigs = {
		'bottom-left': {
			title: 'Frontend Development',
			color: '#ff6b6b',
			initialCode: `// React Component Example
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default MyComponent;`
		},
		'bottom-right': {
			title: 'Backend Development',
			color: '#4ecdc4',
			initialCode: `// Express.js API Example
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  const newUser = { id: Date.now(), name };
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`
		},
		'top-left': {
			title: 'Database Design',
			color: '#45b7d1',
			initialCode: `-- SQL Database Schema Example
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(200) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (username, email) VALUES 
  ('john_doe', 'john@example.com'),
  ('jane_smith', 'jane@example.com');

INSERT INTO posts (user_id, title, content) VALUES 
  (1, 'My First Post', 'This is the content of my first post.'),
  (2, 'Hello World', 'Just saying hello to everyone!');`
		},
		'top-right': {
			title: 'DevOps & Deployment',
			color: '#f9ca24',
			initialCode: `# Docker Compose Example
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`
		}
	}

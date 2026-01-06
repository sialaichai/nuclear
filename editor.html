<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Question Bank Editor</title>
    <style>
        :root {
            --primary: #2563eb;
            --bg: #f1f5f9;
            --sidebar: #1e293b;
            --text-light: #f8fafc;
            --text-dark: #334155;
            --code-bg: #ffffff;
        }
        
        body { margin: 0; display: flex; height: 100vh; font-family: 'Segoe UI', system-ui, sans-serif; background: var(--bg); color: var(--text-dark); }
        
        /* Sidebar Navigation */
        #sidebar {
            width: 250px;
            background: var(--sidebar);
            color: var(--text-light);
            display: flex;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
        
        #sidebar h2 { font-size: 1.1rem; border-bottom: 1px solid #475569; padding-bottom: 0.8rem; margin-top: 0; }
        
        .file-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            text-align: left;
            padding: 12px;
            cursor: pointer;
            border-radius: 6px;
            margin-bottom: 4px;
            font-size: 0.9rem;
            transition: all 0.2s;
            display: flex;
            align-items: center;
        }
        .file-btn:hover { background: #334155; color: white; }
        .file-btn.active { background: var(--primary); color: white; font-weight: 600; }
        .file-btn::before { content: '📄'; margin-right: 8px; font-size: 1rem; }

        /* Main Editor Area */
        #main { flex: 1; display: flex; flex-direction: column; height: 100%; }
        
        /* Toolbar */
        .toolbar {
            background: white;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .file-info { font-weight: 700; color: var(--text-dark); font-size: 1.1rem; }
        .status { font-size: 0.85rem; margin-left: 10px; color: #64748b; font-weight: normal; }
        
        .btn {
            padding: 8px 16px;
            border-radius: 6px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background 0.2s;
        }
        .btn-add { background: #e2e8f0; color: #475569; margin-right: 10px; }
        .btn-add:hover { background: #cbd5e1; }
        .btn-save { background: var(--primary); color: white; }
        .btn-save:hover { background: #1d4ed8; }

        /* Text Area */
        .editor-container { flex: 1; position: relative; padding: 0; }
        textarea {
            width: 100%;
            height: 100%;
            resize: none;
            border: none;
            padding: 20px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.6;
            background: var(--code-bg);
            color: #333;
            box-sizing: border-box;
            outline: none;
        }

        /* Responsive helper */
        @media (max-width: 768px) {
            #sidebar { width: 60px; padding: 10px; }
            #sidebar h2, .file-btn span { display: none; }
            .file-btn::before { margin: 0; font-size: 1.5rem; }
        }
    </style>
</head>
<body>

<div id="sidebar">
    <h2>Questions Repo</h2>
    <div id="file-list">
        </div>
    <div style="margin-top: auto; font-size: 0.75rem; color: #64748b; padding-top: 1rem; border-top: 1px solid #334155;">
        Editing files from <code>/questions</code>
    </div>
</div>

<div id="main">
    <div class="toolbar">
        <div>
            <span class="file-info" id="current-filename">Select a file</span>
            <span id="status-msg" class="status"></span>
        </div>
        <div>
            <button class="btn btn-add" onclick="addQuestionTemplate()">➕ Add New Question</button>
            <button class="btn btn-save" onclick="downloadFile()">⬇️ Download Updated File</button>
        </div>
    </div>
    
    <div class="editor-container">
        <textarea id="code-editor" placeholder="Click a file on the left to load its content..."></textarea>
    </div>
</div>

<script>
    // ============================================
    // ⚙️ CONFIGURATION
    // Defined based on your specific directory structure
    // ============================================
    const questionFiles = [
        "level1.js",
        "level2.js",
        "level3.js",
        "level4.js",
        "level5.js"
    ];
    
    const BASE_PATH = "questions/"; 

    // ============================================
    // 🚀 LOGIC
    // ============================================
    const editor = document.getElementById('code-editor');
    const statusLabel = document.getElementById('status-msg');
    const fileList = document.getElementById('file-list');
    let currentFileName = "";

    // 1. Initialize File List
    questionFiles.forEach(file => {
        const btn = document.createElement('button');
        btn.className = 'file-btn';
        // Create span for text so we can hide it on mobile
        const span = document.createElement('span');
        span.textContent = file;
        btn.appendChild(span);
        
        btn.onclick = () => loadFile(file, btn);
        fileList.appendChild(btn);
    });

    // 2. Load File Content
    async function loadFile(filename, btnElement) {
        // Update UI
        document.querySelectorAll('.file-btn').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
        
        currentFileName = filename;
        document.getElementById('current-filename').textContent = filename;
        statusLabel.textContent = "Loading...";
        statusLabel.style.color = "#64748b";

        try {
            // Fetch the raw text of the JS file
            const response = await fetch(BASE_PATH + filename);
            if (!response.ok) throw new Error("File not found");
            
            const text = await response.text();
            editor.value = text;
            statusLabel.textContent = "Loaded successfully.";
            statusLabel.style.color = "#16a34a"; // Green
        } catch (error) {
            console.error(error);
            editor.value = "// Error loading file.\n// Ensure this HTML file is running on a server (GitHub Pages or localhost)\n// and that the 'questions' folder exists.";
            statusLabel.textContent = "Error loading file.";
            statusLabel.style.color = "#dc2626"; // Red
        }
    }

    // 3. Add Question Template (Smart Insert)
    function addQuestionTemplate() {
        if (!currentFileName) return alert("Please select a file first.");

        // Template matches your specific JS structure
        const template = `
        {
            id: 999,
            question: "New Question Text Here",
            options: [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            correctAnswer: 0,
            explanation: "Explanation for the correct answer.",
            hint: "Hint for the user.",
            points: 100,
            topic: "Topic Name"
        },`;

        const content = editor.value;
        
        // Try to find the end of the questions array
        // We look for the closing bracket ']' before the final closing brace '};'
        const lastBracketIndex = content.lastIndexOf(']');
        
        if (lastBracketIndex !== -1) {
            // Insert before the closing bracket
            const before = content.substring(0, lastBracketIndex);
            const after = content.substring(lastBracketIndex);
            
            // Check if we need a comma before inserting
            // Simple check: look at the non-whitespace char before the bracket
            const precedingText = before.trimEnd();
            const needsComma = !precedingText.endsWith(',') && !precedingText.endsWith('[');
            
            editor.value = before + (needsComma ? "," : "") + template + "\n    " + after;
            
            // Scroll to bottom to see new question
            editor.scrollTop = editor.scrollHeight;
            statusLabel.textContent = "New question added (scroll down).";
        } else {
            // Fallback: just append to bottom if structure is weird
            editor.value += "\n" + template;
            statusLabel.textContent = "Template appended to end.";
        }
    }

    // 4. Download File
    function downloadFile() {
        if (!currentFileName) return;

        const content = editor.value;
        const blob = new Blob([content], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = currentFileName; // e.g. "level1.js"
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        statusLabel.textContent = "File downloaded. Please upload to GitHub.";
    }
</script>

</body>
</html>

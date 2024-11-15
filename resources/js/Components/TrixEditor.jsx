// src/components/TrixEditor.jsx
import React, { useState, useEffect, useRef } from 'react';
import 'trix/dist/trix.css';

const TrixEditor = () => {
    const [content, setContent] = useState('');
    const editorRef = useRef(null);

    useEffect(() => {
        import('trix');
        const editor = editorRef.current;

        const handleChange = (event) => {
            setContent(event.target.innerHTML);
        };

        editor?.addEventListener('trix-change', handleChange);

        return () => {
            editor?.removeEventListener('trix-change', handleChange);
        };
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Content</h2>
            <input
                id="trix-editor"
                type="hidden"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <trix-editor
                input="trix-editor"
                ref={editorRef}
                className="min-h-[300px] border p-4 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></trix-editor>
        </div>
    );
};

export default TrixEditor;

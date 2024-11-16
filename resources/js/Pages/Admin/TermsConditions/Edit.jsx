import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import 'font-awesome/css/font-awesome.min.css';

const EditTermsAndConditions = ({ termsAndConditions }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeFormats, setActiveFormats] = useState([]);
    const [fontSize, setFontSize] = useState(3);
    const editorRef = useRef(null);

    useEffect(() => {
        if (termsAndConditions && editorRef.current) {
            // Pre-fill the editor with existing content
            editorRef.current.innerHTML = termsAndConditions.content;
        }
    }, [termsAndConditions]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const content = editorRef.current.innerHTML; // Get content from the editor
            // Send the updated content to the backend for saving
            await Inertia.put(`/terms-and-conditions/${termsAndConditions.id}`, { content });
        } catch (error) {
            console.error('Failed to update the text:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormatting = (format) => {
        if (activeFormats.includes(format)) {
            document.execCommand(format, false, null);
            setActiveFormats((prevFormats) => prevFormats.filter((item) => item !== format));
        } else {
            document.execCommand(format, false, null);
            setActiveFormats((prevFormats) => [...prevFormats, format]);
        }
    };

    const handleFontSizeChange = (size) => {
        setFontSize(size);
        document.execCommand('fontSize', false, size);
    };

    const handleNumbering = () => {
        handleToggleFormat('insertOrderedList', 'numbering');
    };

    const handleBullets = () => {
        handleToggleFormat('insertUnorderedList', 'bullets');
    };

    const handleAlignment = (align) => {
        // Clear any active alignment format before setting the new one
        const alignmentFormats = ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
        document.execCommand(align, false, null);
        setActiveFormats((prevFormats) =>
            [...prevFormats.filter((item) => !alignmentFormats.includes(item)), align]
        );
    };

    const handleToggleFormat = (command, formatName) => {
        document.execCommand(command);
        setActiveFormats((prevFormats) =>
            prevFormats.includes(formatName)
                ? prevFormats.filter((item) => item !== formatName)
                : [...prevFormats, formatName]
        );
    };

    const handleTextColorChange = (color) => {
        document.execCommand('foreColor', false, color);
    };

    const handleFontChange = (font) => {
        document.execCommand('fontName', false, font);
    };

    const handleInputChange = () => {
        if (editorRef.current.innerHTML.trim() === '') {
            setFontSize(3);
            document.execCommand('fontSize', false, 3);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8 bg-white shadow-xl rounded-lg mx-auto">
                <Head title="Edit Terms and Conditions" />
                <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl">
                    <h1 className="text-4xl font-semibold text-gray-900 mb-8">Edit Terms and Conditions</h1>
                    <div className="mb-4 flex space-x-2">
                        {/* Formatting Buttons (Bold, Italic, etc.) */}
                        <button onClick={() => handleFormatting('bold')} className={`px-4 py-2 rounded-full text-lg ${activeFormats.includes('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-all duration-300 hover:bg-blue-400`}>
                            <i className="fa fa-bold"></i>
                        </button>
                        <button onClick={() => handleFormatting('italic')} className={`px-4 py-2 rounded-full text-lg ${activeFormats.includes('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-all duration-300 hover:bg-blue-400`}>
                            <i className="fa fa-italic"></i>
                        </button>
                        {/* Add other formatting buttons */}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div ref={editorRef} contentEditable placeholder="Write your text here..." onInput={handleInputChange} className="w-full p-6 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-lg text-gray-700"></div>
                        <div className="flex justify-end space-x-4">
                            <button type="submit" className={`px-6 py-2 rounded-lg font-semibold text-white ${isSubmitting ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300`} disabled={isSubmitting}>
                                {isSubmitting ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditTermsAndConditions;

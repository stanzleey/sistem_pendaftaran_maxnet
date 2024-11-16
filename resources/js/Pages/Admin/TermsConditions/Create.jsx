import React, { useState, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import 'font-awesome/css/font-awesome.min.css';

const CreateTermsAndConditions = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeFormats, setActiveFormats] = useState([]);
    const [fontSize, setFontSize] = useState(3);
    const editorRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const content = editorRef.current.innerHTML;

            await Inertia.post('/terms-and-conditions', { content });
        } catch (error) {
            console.error('Failed to submit text:', error);
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

    const handleAlignment = (align) => {
        const alignmentFormats = ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
        document.execCommand(align, false, null);
        setActiveFormats((prevFormats) =>
            [...prevFormats.filter((item) => !alignmentFormats.includes(item)), align]
        );
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
                <Head title="Create Terms and Conditions" />
                <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl">
                    <h1 className="text-4xl font-semibold text-gray-900 mb-8">
                        Create Terms and Conditions
                    </h1>

                    {/* Formatting Buttons */}
                    <div className="mb-4 flex space-x-2">
                        <button
                            onClick={() => handleFormatting('bold')}
                            className={`px-4 py-2 rounded-full text-lg ${
                                activeFormats.includes('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            } transition-all duration-300 hover:bg-blue-400`}
                        >
                            <i className="fa fa-bold"></i>
                        </button>
                        <button
                            onClick={() => handleFormatting('italic')}
                            className={`px-4 py-2 rounded-full text-lg ${
                                activeFormats.includes('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            } transition-all duration-300 hover:bg-blue-400`}
                        >
                            <i className="fa fa-italic"></i>
                        </button>
                        <button
                            onClick={() => handleFormatting('underline')}
                            className={`px-4 py-2 rounded-full text-lg ${
                                activeFormats.includes('underline') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            } transition-all duration-300 hover:bg-blue-400`}
                        >
                            <i className="fa fa-underline"></i>
                        </button>
                        <button
                            onClick={() => handleAlignment('justifyLeft')}
                            className={`px-4 py-2 rounded-full ${
                                activeFormats.includes('justifyLeft') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            } hover:bg-blue-400`}
                        >
                            <i className="fa fa-align-left"></i>
                        </button>
                        <button
                            onClick={() => handleAlignment('justifyCenter')}
                            className={`px-4 py-2 rounded-full ${
                                activeFormats.includes('justifyCenter') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            } hover:bg-blue-400`}
                        >
                            <i className="fa fa-align-center"></i>
                        </button>
                        <button
                            onClick={() => handleAlignment('justifyRight')}
                            className={`px-4 py-2 rounded-full ${
                                activeFormats.includes('justifyRight') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            } hover:bg-blue-400`}
                        >
                            <i className="fa fa-align-right"></i>
                        </button>
                        <button
                            onClick={() => handleAlignment('justifyFull')}
                            className={`px-4 py-2 rounded-full ${
                                activeFormats.includes('justifyFull') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            } hover:bg-blue-400`}
                        >
                            <i className="fa fa-align-justify"></i>
                        </button>
                        <select
                            onChange={(e) => handleFontSizeChange(e.target.value)}
                            className="px-4 py-2 bg-gray-200 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="3">Normal</option>
                            <option value="4">Large</option>
                            <option value="5">Extra Large</option>
                            <option value="6">2x Extra Large</option>
                        </select>
                    </div>

                    {/* Text Editor */}
                    <form onSubmit={handleSubmit}>
                        <div ref={editorRef} contentEditable placeholder="Write your text here..." onInput={handleInputChange} className={`w-full p-6 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-lg text-gray-700 ${fontSize === 3 ? 'text-base' : ''}`}></div>
                        <div className="flex justify-end space-x-4">
                            <button type="submit" className={`px-6 py-2 rounded-lg font-semibold text-white ${isSubmitting ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300`} disabled={isSubmitting}>
                                {isSubmitting ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTermsAndConditions;

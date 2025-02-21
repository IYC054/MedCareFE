import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


function ResponseBackFeedback() {
    const [recipientEmail, setRecipientEmail] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (recipientEmail && title && content) {
            console.log({
                recipientEmail,
                title,
                content,
            });
            alert("Email sent successfully!");
            // Reset form fields after submission
            setRecipientEmail("");
            setTitle("");
            setContent("");
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="max-w-screen-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-[#da624a]">
            <h3 className="text-xl font-semibold text-[#da624a] mb-4">Send Email</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Recipient Email */}
                <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                        Recipient Email
                    </label>
                    <input
                        id="recipient"
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="Enter recipient's email"
                        className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        required
                    />
                </div>

                {/* Title Field */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter email title"
                        className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        required
                    />
                </div>

                {/* Message Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                        config={{
                            toolbar: [
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "link",
                              "bulletedList",
                              "numberedList",
                              "|",
                              "blockQuote",
                              "undo",
                              "redo",
                            ],
                          }}
                          
                    />
               
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#da624a] text-white rounded-md hover:bg-[#c85138]"
                    >
                        Gửi mail
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ResponseBackFeedback;

"use client";

import React, { useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const PLACEHOLDER_REGEX =
  /\[(Address|Name|Your Name|Your Address|Your Phone Number|Your Email Address|Recipient Name|Recipient Address|Recipient Email|Recipient Phone|Position|Company|Date|Salutation|Closing|Signature|Your Email|Platform where you saw the advertisement|_company-name_|_company_name_|company-name|company_name|[A-Za-z0-9 .,&'-]+ Address|[A-Za-z0-9 .,&'-]+ Name)\]/g;

function highlightPlaceholders(text) {
  return text.replace(
    PLACEHOLDER_REGEX,
    (match) =>
      `<span style="background: #fff3cd; color: #856404; padding: 2px 4px; border-radius: 3px; border: 1px solid #ffeeba;">${match}</span>`
  );
}

const CoverLetterPreview = ({ content: initialContent, onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const previewRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleEdit = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = () => {
    setIsModalOpen(false);
    if (onSave) onSave(content);
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = previewRef.current;
      const opt = {
        margin: [15, 15],
        filename: "cover-letter.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-4">
      {/* Info message about placeholders */}
      <div className="mb-4 p-3 rounded bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 text-sm">
        <strong>Heads up!</strong> Your generated cover letter may contain
        placeholders like <code>[Your Name]</code>, <code>[Your Address]</code>,
        etc. Please REVIEW and REPLACE these with your actual details before
        using or sending your cover letter !
      </div>
      <div ref={previewRef}>
        {/* Highlight placeholders in the preview */}
        <MDEditor.Markdown
          source={highlightPlaceholders(content)}
          style={{ minHeight: 700 }}
          components={{
            code({ node, inline, className, children, ...props }) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Cover Letter</h2>
            <MDEditor value={content} onChange={setContent} height={400} />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetterPreview;

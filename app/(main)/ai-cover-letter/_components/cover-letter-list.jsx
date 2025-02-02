"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Edit2, Eye, Trash2, Download, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";
import { updateCoverLetter } from "@/actions/cover-letter";
import MDEditor from "@uiw/react-md-editor";
import ReactDOM from "react-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

export default function CoverLetterList({ coverLetters: initialCoverLetters }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [coverLetters, setCoverLetters] = useState(initialCoverLetters);
  const [isSaving, setIsSaving] = useState(false);
  const [editorHeight, setEditorHeight] = useState(400);
  const [editorPreviewMode, setEditorPreviewMode] = useState("live");
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [downloadFilename, setDownloadFilename] = useState("");
  const [downloadLetterId, setDownloadLetterId] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    function updateHeight() {
      if (typeof window !== "undefined") {
        const modalPadding = window.innerWidth < 768 ? 16 : 32;
        const available = Math.max(
          window.innerHeight - (60 + 70 + modalPadding * 2),
          200
        );
        setEditorHeight(Math.min(available, 700));
      }
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setEditorPreviewMode("edit");
      } else {
        setEditorPreviewMode("live");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      setCoverLetters(coverLetters.filter((c) => c.id !== id));
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  const handleEditOpen = (letter) => {
    setEditingId(letter.id);
    setEditContent(letter.content);
  };

  const handleEditClose = () => {
    setEditingId(null);
    setEditContent("");
  };

  const handleEditSave = async () => {
    setIsSaving(true);
    try {
      const updated = await updateCoverLetter(editingId, editContent);
      setCoverLetters(
        coverLetters.map((c) =>
          c.id === editingId ? { ...c, content: updated.content } : c
        )
      );
      toast.success("Cover letter updated!");
      handleEditClose();
    } catch (error) {
      toast.error(error.message || "Failed to update cover letter");
    } finally {
      setIsSaving(false);
    }
  };

  const openDownloadDialog = (letter) => {
    setDownloadLetterId(letter.id);
    setDownloadFilename(`cover-letter-${letter.companyName || letter.id}.pdf`);
    setDownloadDialogOpen(true);
  };
  const closeDownloadDialog = () => {
    setDownloadDialogOpen(false);
    setDownloadLetterId(null);
    setDownloadFilename("");
  };
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const letter = coverLetters.find((c) => c.id === downloadLetterId);
      if (!letter || !letter.content) {
        toast.error("No content to download");
        return;
      }
      let filename = downloadFilename.trim();
      if (!filename) return;
      if (!filename.endsWith(".pdf")) filename += ".pdf";
      const element = document.getElementById(`cover-letter-pdf-${letter.id}`);
      if (!element) {
        toast.error("PDF element not found");
        return;
      }
      const opt = {
        margin: [15, 15],
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().set(opt).from(element).save();
      closeDownloadDialog();
    } catch (error) {
      toast.error("Failed to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  const getEditorHeight = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return 300;
    }
    return 900;
  };

  if (!coverLetters?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="gradient-text">No Cover Letters Yet</CardTitle>
          <CardDescription>
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {coverLetters.map((letter) => (
        <Card key={letter.id} className="group relative ">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl gradient-title">
                  {letter.jobTitle} at {letter.companyName}
                </CardTitle>
                <CardDescription>
                  Created {format(new Date(letter.createdAt), "PPP")}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white"
                  variant="outline"
                  size="icon"
                  onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  className="cursor-pointer bg-green-500 hover:bg-green-700 text-white"
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditOpen(letter)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white"
                  variant="outline"
                  size="icon"
                  onClick={() => openDownloadDialog(letter)}
                  disabled={!letter.content}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Cover Letter?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your cover letter for {letter.jobTitle} at{" "}
                        {letter.companyName}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-destructive text-white hover:bg-destructive/80 cursor-pointer"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm line-clamp-3">
              {letter.jobDescription}
            </div>
            <div className="hidden">
              <div id={`cover-letter-pdf-${letter.id}`}>
                <MDEditor.Markdown
                  source={letter.content}
                  style={{
                    background: "white",
                    color: "black",
                    padding: 24,
                    maxWidth: 700,
                  }}
                />
              </div>
            </div>
          </CardContent>
          {editingId === letter.id && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient">
              <div className="bg-white flex flex-col shadow-lg w-full max-w-lg md:max-w-xl lg:max-w-5xl xl:max-w-6xl min-w-[320px] mx-auto my-auto p-3 md:p-6 lg:p-10 rounded-lg max-h-[95vh] overflow-y-auto relative pb-6">
                <button
                  onClick={handleEditClose}
                  type="button"
                  aria-label="Close"
                  className="
    absolute top-2 right-4
    p-1 rounded-full
    text-gray-500 hover:text-gray-700
    hover:bg-gray-100
    text-4xl font-semibold
    focus:outline-none focus:ring-2 focus:ring-gray-300
    transition duration-200 cursor-pointer
  "
                >
                  &times;
                </button>

                <h2 className="text-xl font-bold mb-4">Edit Cover Letter</h2>
                <div className="flex-1 min-h-0 overflow-y-auto">
                  <MDEditor
                    value={editContent}
                    onChange={setEditContent}
                    height={editorHeight}
                    preview={editorPreviewMode}
                  />
                </div>
                <div className="flex justify-center w-full gap-6 md:gap-12 pt-4 pb-2 bg-white sticky bottom-0 z-10">
                  <button
                    onClick={handleEditClose}
                    className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition border text-black cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    variant="destructive"
                    onClick={handleEditSave}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer flex items-center gap-2"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        Saving
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        Save
                      </>
                    )}{" "}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}
      <Dialog open={downloadDialogOpen} onOpenChange={setDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download PDF</DialogTitle>
            <DialogDescription>
              Enter a filename for your PDF:
            </DialogDescription>
          </DialogHeader>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mt-2 mb-4"
            value={downloadFilename}
            onChange={(e) => setDownloadFilename(e.target.value)}
            placeholder="cover-letter.pdf"
            autoFocus
          />
          <DialogFooter className="gap-6">
            <DialogClose asChild>
              <button
                className="px-4 py-2 bg-gray-300 rounded text-black hover:bg-gray-400 transition cursor-pointer"
                type="button"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
              onClick={handleDownloadPDF}
              disabled={isDownloading || !downloadFilename.trim()}
              type="button"
            >
              {isDownloading ? "Downloading..." : "Download"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

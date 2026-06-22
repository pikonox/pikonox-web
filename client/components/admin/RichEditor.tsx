"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter,
  AlignRight, List, ListOrdered, Link as LinkIcon, Undo, Redo, Heading2, Heading3,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function RichEditor({ value, onChange, placeholder = "Write content here...", minHeight = 200 }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none p-4",
        style: `min-height: ${minHeight}px`,
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const btn = (active: boolean) =>
    `p-1.5 rounded hover:bg-gray-100 transition-colors ${active ? "bg-gray-200 text-blue-700" : "text-gray-600"}`;

  function setLink() {
    const url = window.prompt("URL:", editor?.getAttributes("link").href);
    if (url === null) return;
    if (url === "") { editor?.chain().focus().unsetLink().run(); return; }
    editor?.chain().focus().setLink({ href: url }).run();
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 bg-gray-50">
        <button type="button" onClick={() => editor?.chain().focus().undo().run()} className={btn(false)} title="Undo"><Undo className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor?.chain().focus().redo().run()} className={btn(false)} title="Redo"><Redo className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor?.isActive("heading", { level: 2 }) ?? false)} title="H2"><Heading2 className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor?.isActive("heading", { level: 3 }) ?? false)} title="H3"><Heading3 className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className={btn(editor?.isActive("bold") ?? false)} title="Bold"><Bold className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className={btn(editor?.isActive("italic") ?? false)} title="Italic"><Italic className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleUnderline().run()} className={btn(editor?.isActive("underline") ?? false)} title="Underline"><UnderlineIcon className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <button type="button" onClick={() => editor?.chain().focus().setTextAlign("left").run()} className={btn(editor?.isActive({ textAlign: "left" }) ?? false)} title="Left"><AlignLeft className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor?.chain().focus().setTextAlign("center").run()} className={btn(editor?.isActive({ textAlign: "center" }) ?? false)} title="Center"><AlignCenter className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor?.chain().focus().setTextAlign("right").run()} className={btn(editor?.isActive({ textAlign: "right" }) ?? false)} title="Right"><AlignRight className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={btn(editor?.isActive("bulletList") ?? false)} title="Bullet list"><List className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={btn(editor?.isActive("orderedList") ?? false)} title="Numbered list"><ListOrdered className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <button type="button" onClick={setLink} className={btn(editor?.isActive("link") ?? false)} title="Link"><LinkIcon className="w-4 h-4" /></button>
      </div>
      {/* Content */}
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}
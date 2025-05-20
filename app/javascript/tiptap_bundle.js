/*  This file's ONLY responsibility is to gather every bit of TipTap we need.
    It is the single thing that esbuild will bundle.                       */

import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import BubbleMenu from "@tiptap/extension-bubble-menu";

export {
  Editor,
  StarterKit,
  Link,
  Image,
  Placeholder,
  Underline,
  Highlight,
  TaskList,
  TaskItem,
  TextAlign,
  Typography,
  BubbleMenu
};

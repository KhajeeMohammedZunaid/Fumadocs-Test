export interface FileItem {
  id: string;
  name: string;
  path: string;
  folder: string;
  language?: string;
  code: string;
}

export interface InteractiveFileTreeProps {
  files: FileItem[];
  defaultFileId?: string;
  title?: string;
  className?: string;
  height?: string | number;
}


import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

// Dynamically serve locally installed monaco-editor assets directly from node_modules
// This keeps the public/ directory completely clean with zero vendor assets or clutter.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  
  // Resolve path inside node_modules/monaco-editor/min
  const sanitizedSegments = segments.filter((s) => !s.includes(".."));
  const filePath = path.join(
    process.cwd(),
    "node_modules",
    "monaco-editor",
    "min",
    ...sanitizedSegments
  );

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return new NextResponse("File Not Found", { status: 404 });
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentTypeMap: Record<string, string> = {
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".ttf": "font/ttf",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".html": "text/html",
  };

  const contentType = contentTypeMap[ext] || "application/octet-stream";
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

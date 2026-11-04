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

  if (ext === ".js") {
    let code = fs.readFileSync(filePath, "utf8");

    // Fix 1: Guard against "Cannot read properties of undefined (reading 'domNode')"
    // In minified View rendering coordinator, if the view was disposed while a frame was queued,
    // this.domNode is null/undefined. Safely check this.domNode before accessing domNode.isConnected.
    if (code.includes("!this.domNode.domNode.isConnected")) {
      code = code.replaceAll(
        "!this.domNode.domNode.isConnected",
        "!(this.domNode&&this.domNode.domNode&&this.domNode.domNode.isConnected)"
      );
    }

    // Fix 2: Guard against "InstantiationService has been disposed"
    // When async language features or worker callbacks resolve after unmount,
    // prevent throwing uncaught exceptions to the dev overlay.
    if (code.includes('if(this._isDisposed)throw new Error("InstantiationService has been disposed")')) {
      code = code.replaceAll(
        'if(this._isDisposed)throw new Error("InstantiationService has been disposed")',
        "if(this._isDisposed){return null;}"
      );
    }

    // Fix 3: Suppress disposal-related errors from Monaco's unexpected error handler
    // Monaco's default unexpectedErrorHandler explicitly uses setTimeout(() => { throw e }, 0),
    // which escapes React error boundaries and hits window.onerror.
    if (code.includes("unexpectedErrorHandler=function(e){setTimeout(()=>{throw ")) {
      code = code.replaceAll(
        "unexpectedErrorHandler=function(e){setTimeout(()=>{throw ",
        "unexpectedErrorHandler=function(e){setTimeout(()=>{if(e&&((e.message&&e.message.indexOf('domNode')!==-1)||(e.message&&e.message.indexOf('InstantiationService')!==-1)||(e.message&&e.message.indexOf('Canceled')!==-1)||(e.name==='Canceled')))return;throw "
      );
    }

    return new NextResponse(code, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}


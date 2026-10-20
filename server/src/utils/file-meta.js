import path from 'path';
import { exiftool } from 'exiftool-vendored';
import AdmZip from 'adm-zip'; // npm install adm-zip

export default async function handleFileMetadata(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();

    // 1. Deep-clean Office Documents (.docx, .xlsx)
    if (ext === '.docx' || ext === '.xlsx') {
      const zip = new AdmZip(filePath);
      const entries = zip.getEntries();

      entries.forEach((entry) => {
        const name = entry.entryName;

        // A. Delete standard document properties
        if (name.startsWith('docProps/')) {
          zip.deleteFile(name);
        }

        // B. Delete custom XML parts (where hidden titles, GUIDs, and tracking hashes live)
        if (name.startsWith('customXml/')) {
          zip.deleteFile(name);
        }

        // C. Remove comments
        if (name === 'word/comments.xml' || name === 'word/commentsExtended.xml') {
          zip.deleteFile(name);
        }

        // D. Normalize ZIP entry timestamps to hide modification dates
        entry.header.time = 0; 
      });

      // Write the fully scrubbed zip back
      zip.writeZip(filePath);
      console.log(`Deep-cleaned all custom and core metadata from: ${filePath}`);
      return;
    }

    // 2. Images (.png, .jpeg, .jpg) & PDF files
    const exifWritable = ['.png', '.jpeg', '.jpg', '.pdf'];
    if (exifWritable.includes(ext)) {
      await exiftool.read(filePath, { groupNames: true });
      await exiftool.write(filePath, { All: "" }, ["-overwrite_original"]);
      console.log(`Successfully stripped metadata from ${ext} file: ${filePath}`);
      return;
    }

  } catch (error) {
    console.error(`Failed to strip metadata for ${filePath}:`, error);
    throw error;
  }
}
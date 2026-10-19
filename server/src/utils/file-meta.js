import { exiftool } from "exiftool-vendored";



export default async function handleFileMetadata(file){
    await exiftool.read(file, { groupNames: true });
    await exiftool.write(file, { All: "" }, ["-overwrite_original"]);
    // await exiftool.end();
}

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const originalsDirectory = path.join(projectRoot, "photography-originals");
const publicDirectory = path.join(projectRoot, "public");
const thumbnailDirectory = path.join(publicDirectory, "photography", "thumbs");
const lightboxDirectory = path.join(publicDirectory, "photography", "lightbox");
const siteImageDirectory = path.join(publicDirectory, "images");

const galleryFiles = [
  "0EEC6BF3-85B8-4414-A9D1-CD6785ABB48E.jpeg",
  "1619995C-CA7F-43C6-A56B-61CB96D923E6.jpeg",
  "43F6FA2C-3939-474B-9A79-57D7A9416A7D.jpeg",
  "44CB2E56-2657-4ADF-97F2-0D3FC9B3E7AE.jpeg",
  "67CCCD08-38E9-46A9-B5CC-8B1356154024_1_201_a.jpeg",
  "8E450533-33C1-4BC9-8F3D-9CD169054F74_1_201_a.jpeg",
  "8E8AC0B4-68DD-411C-B7BC-6F70586C36E6.jpeg",
  "975DB45C-D720-4E93-80B2-B415A30F03C2.jpeg",
  "DSC_0098.JPG",
  "DSC_0181.JPG",
  "DSC_0315.JPG",
  "DSC_0724.JPG",
  "DSC_0729.JPG",
  "DSC_0739.JPG",
  "DSC_0745.JPG",
  "DSC_0992.JPG",
  "DSC_1009.JPG",
  "DSC_1038.JPG",
  "DSC_1039.JPG",
  "DSC_1050.JPG",
];

await Promise.all([
  mkdir(thumbnailDirectory, { recursive: true }),
  mkdir(lightboxDirectory, { recursive: true }),
  mkdir(siteImageDirectory, { recursive: true }),
]);

const generatedGallery = [];

for (const sourceName of galleryFiles) {
  const sourcePath = path.join(originalsDirectory, sourceName);
  const outputName = `${path.parse(sourceName).name}.webp`;
  const thumbnailPath = path.join(thumbnailDirectory, outputName);
  const lightboxPath = path.join(lightboxDirectory, outputName);

  const thumbnailInfo = await sharp(sourcePath)
    .rotate()
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6, smartSubsample: true })
    .toFile(thumbnailPath);

  const lightboxInfo = await sharp(sourcePath)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 84, effort: 6, smartSubsample: true })
    .toFile(lightboxPath);

  generatedGallery.push({
    sourceName,
    outputName,
    thumbnail: { width: thumbnailInfo.width, height: thumbnailInfo.height, bytes: thumbnailInfo.size },
    lightbox: { width: lightboxInfo.width, height: lightboxInfo.height, bytes: lightboxInfo.size },
  });
}

const generateResponsiveImage = async (sourcePath, prefix, widths, quality) => {
  const outputs = [];

  for (const width of widths) {
    const outputPath = path.join(siteImageDirectory, `${prefix}-${width}.webp`);
    const info = await sharp(sourcePath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toFile(outputPath);
    outputs.push({ file: path.basename(outputPath), width: info.width, height: info.height, bytes: info.size });
  }

  return outputs;
};

const hero = await generateResponsiveImage(
  path.join(projectRoot, "design", "spikes.jpg"),
  "hero",
  [480, 719],
  82,
);

const about = await generateResponsiveImage(
  path.join(projectRoot, "design", "download (1).jpg"),
  "about",
  [480, 604],
  82,
);

const socialPreview = await sharp(path.join(projectRoot, "design", "spikes.jpg"))
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 88, progressive: true })
  .toFile(path.join(siteImageDirectory, "social-preview.jpg"));

const summary = {
  gallery: generatedGallery,
  siteImages: { hero, about, socialPreview },
};

console.log(JSON.stringify(summary, null, 2));

export function getDisplayImageUrl(imageUrl) {
  const trimmedUrl = String(imageUrl || "").trim();

  if (!trimmedUrl) {
    return "";
  }

  const googleDriveFileId = getGoogleDriveFileId(trimmedUrl);

  if (googleDriveFileId) {
    return `https://drive.google.com/thumbnail?id=${encodeURIComponent(
      googleDriveFileId,
    )}&sz=w1000`;
  }

  return trimmedUrl;
}

function getGoogleDriveFileId(imageUrl) {
  try {
    const url = new URL(imageUrl);

    if (url.hostname !== "drive.google.com") {
      return "";
    }

    const filePathMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
    const fileId = filePathMatch?.[1] || url.searchParams.get("id") || "";

    return fileId.trim();
  } catch {
    return "";
  }
}

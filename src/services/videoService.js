import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, isDemo } from '../config/firebase';

/**
 * Firebase Storage Video Service
 * Handles video upload/download for course content
 */

const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB

export async function uploadVideo({ coachId, file, onProgress }) {
  if (isDemo) {
    return simulateUpload(file, onProgress);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large. Maximum size is 5GB.');
  }

  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `videos/${coachId}/${timestamp}_${safeName}`;
  const storageRef = ref(storage, path);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onProgress?.(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          videoId: path,
          url: downloadURL,
          path,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploaded',
        });
      }
    );
  });
}

function simulateUpload(file, onProgress) {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress?.(100);
        resolve({
          videoId: `demo_${Date.now()}`,
          url: URL.createObjectURL(file),
          path: `demo/videos/${file.name}`,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploaded',
        });
      } else {
        onProgress?.(Math.round(progress));
      }
    }, 300);
  });
}

export async function deleteVideo(videoPath) {
  if (isDemo) return;
  const storageRef = ref(storage, videoPath);
  await deleteObject(storageRef);
}

export async function getVideoUrl(videoPath) {
  if (isDemo) return null;
  const storageRef = ref(storage, videoPath);
  return getDownloadURL(storageRef);
}

export function isStorageConfigured() {
  return !isDemo;
}

export function getVideoMimeType(file) {
  const types = {
    mp4: 'video/mp4',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    webm: 'video/webm',
    mkv: 'video/x-matroska',
  };
  const ext = file.name.split('.').pop().toLowerCase();
  return types[ext] || 'video/mp4';
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

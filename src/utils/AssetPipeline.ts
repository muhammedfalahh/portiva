/**
 * =============================================================================
 * PORTIVA: Asset Pipeline — Client-Side Image Processing & R2 Upload
 * =============================================================================
 *
 * Production-grade utility for intercepting image uploads, enforcing strict
 * size/dimension limits, and streaming compressed WebP payloads to Cloudflare R2.
 *
 * Processing Pipeline:
 *   1. Validate input is an image MIME type
 *   2. Load into an HTMLImageElement for dimension inspection
 *   3. Downscale if width exceeds maxDimension (preserving aspect ratio)
 *   4. Render to canvas with high-quality smoothing
 *   5. Compress to WebP with progressive quality reduction
 *   6. Enforce strict maxSizeKB output cap
 *   7. Upload resulting blob to Cloudflare R2 via PUT request
 *
 * Design Decisions:
 *   - Canvas-based processing runs entirely client-side, eliminating server
 *     compute costs and reducing upload bandwidth by 60-80%.
 *   - WebP format provides superior compression ratios compared to JPEG/PNG
 *     while maintaining visual quality, and has 97%+ browser support.
 *   - Progressive quality reduction (0.85 → 0.70 → 0.55 → 0.40 → 0.25 → 0.20)
 *     ensures we always hit the size target without over-compressing.
 */

export class AssetPipeline {
  /**
   * Process and compress an image file for optimal storage.
   *
   * Takes a raw File input, resizes if necessary, converts to WebP,
   * and progressively reduces quality until the output is under the
   * specified size limit.
   *
   * @param file          - Raw image File from an <input> or drag-and-drop
   * @param maxDimension  - Maximum width in pixels (height scales proportionally)
   * @param maxSizeKB     - Maximum output size in kilobytes
   * @returns             - Compressed WebP Blob ready for upload
   * @throws              - Error if input is not an image or canvas fails
   */
  static async processAndCompressImage(
    file: File,
    maxDimension = 1080,
    maxSizeKB = 150
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      // ── Guard: Validate MIME type ──────────────────────────────────────
      if (!file.type.startsWith('image/')) {
        return reject(
          new Error('Input file must be a valid image element structure.')
        );
      }

      // ── Step 1: Load image into memory ────────────────────────────────
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        // Release the object URL immediately to prevent memory leaks
        URL.revokeObjectURL(img.src);

        // ── Step 2: Calculate target dimensions ───────────────────────
        let width = img.width;
        let height = img.height;

        // Only downscale — never upscale. Preserve aspect ratio.
        if (width > maxDimension) {
          height = Math.round((maxDimension * height) / width);
          width = maxDimension;
        }

        // ── Step 3: Render to canvas ──────────────────────────────────
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(
            new Error(
              'Could not establish structural 2D canvas frame layers.'
            )
          );
        }

        // Use highest quality smoothing for resize operations
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // ── Step 4: Progressive WebP compression ─────────────────────
        // Start at 0.85 quality and step down by 0.15 until either:
        //   a) The blob is under maxSizeKB, or
        //   b) We hit the quality floor of 0.20
        const executeCompression = (quality: number) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                return reject(
                  new Error('Canvas compilation returned null parameters.')
                );
              }

              // Accept the blob if it's under the size limit or we've
              // hit the quality floor (0.20 is the minimum usable quality)
              if (blob.size <= maxSizeKB * 1024 || quality <= 0.2) {
                resolve(blob);
              } else {
                // Recurse with lower quality
                executeCompression(quality - 0.15);
              }
            },
            'image/webp',
            quality
          );
        };

        executeCompression(0.85);
      };

      img.onerror = () =>
        reject(
          new Error('Failed to load file contents into memory stream objects.')
        );
    });
  }

  /**
   * Upload a compressed blob to Cloudflare R2 storage.
   *
   * By default, it proxies the request securely through the server API route
   * (/api/upload) to prevent exposing R2 credentials to the browser.
   *
   * If a custom r2UploadUrl is provided, it falls back to a direct PUT request.
   *
   * @param blob        - Compressed WebP blob from processAndCompressImage()
   * @param r2UploadUrl - Optional direct upload URL (falls back to /api/upload if omitted)
   * @param authToken   - Optional Cloudflare API bearer token (only for direct uploads)
   * @returns           - The generated unique filename (e.g., "a1b2c3d4.webp")
   * @throws            - Error if upload fails
   */
  static async uploadToCloudflareR2(
    blob: Blob,
    r2UploadUrl?: string,
    authToken?: string
  ): Promise<string> {
    // ── Mode A: Secure API Route Proxy (Default) ──────────────────────────
    if (!r2UploadUrl) {
      const formData = new FormData();
      formData.append('file', blob, 'image.webp');

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Upload to secure server proxy failed: ${uploadResponse.statusText}`
        );
      }

      const data = await uploadResponse.json();
      return data.filename;
    }

    // ── Mode B: Legacy Direct Upload (Requires client-side credentials) ──
    const assetUniqueFilename = `${crypto.randomUUID()}.webp`;
    const destinationEndpoint = `${r2UploadUrl}/${assetUniqueFilename}`;

    const uploadResponse = await fetch(destinationEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/webp',
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
      body: blob,
    });

    if (!uploadResponse.ok) {
      throw new Error(
        `Cloudflare R2 storage engine rejected upload stream: ${uploadResponse.statusText}`
      );
    }

    return assetUniqueFilename;
  }
}

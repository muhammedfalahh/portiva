/**
 * =============================================================================
 * PORTIVA: R2 Server Upload API Route Handler
 * =============================================================================
 *
 * Secure server-side endpoint to handle asset uploads to Cloudflare R2.
 * Resolves the security issue of exposing R2 credentials to the browser
 * by acting as an API proxy.
 *
 * Workflow:
 *   1. Client sends a POST request with the file data in a FormData payload.
 *   2. Server validates the file and reads it into an ArrayBuffer.
 *   3. S3Client from @aws-sdk/client-s3 uploads it to R2 using secure
 *      environment credentials (Access Key and Secret Access Key).
 *   4. Returns the generated unique filename to the client.
 */

import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3Client with Cloudflare R2 credentials from environment variables
const s3Client = new S3Client({
  endpoint: process.env.R2_ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
  region: 'auto',
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file payload provided.' },
        { status: 400 }
      );
    }

    // Convert file to buffer for upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique UUID filename to prevent namespace collisions
    const assetUniqueFilename = `${crypto.randomUUID()}.webp`;

    const command = new PutObjectCommand({
      Bucket: 'portiva-assets',
      Key: assetUniqueFilename,
      Body: buffer,
      ContentType: 'image/webp',
    });

    await s3Client.send(command);

    return NextResponse.json({ filename: assetUniqueFilename });
  } catch (error: any) {
    console.error('Cloudflare R2 Server Upload Error:', error);
    return NextResponse.json(
      { error: `Cloudflare R2 storage engine rejected upload stream: ${error.message}` },
      { status: 500 }
    );
  }
}

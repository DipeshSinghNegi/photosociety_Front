import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { stringify } from 'querystring';

const lastPhotoFile = path.join(process.cwd(), 'public/uploads/.lastPhoto');

export async function GET() {
  try {
    if (!fs.existsSync(lastPhotoFile)) {
      return NextResponse.json({ error: 'No recent pics found' }, { status: 400 });
    }
    const photo = fs.readFileSync(lastPhotoFile, 'utf8');
    return NextResponse.json({ photo });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

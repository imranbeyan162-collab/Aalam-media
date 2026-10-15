import { NextResponse } from 'next/server';
import { getDb, persistDb } from '@/lib/db';

const DEFAULT_PASSCODE = 'misbah123abc';

export async function GET() {
  const db = getDb();
  const passcode = db.adminPasscode || DEFAULT_PASSCODE;
  // Return whether passcode protection is active and the current passcode
  return NextResponse.json({ 
    active: true,
    passcode: passcode
  });
}

export async function POST(req: Request) {
  try {
    const db = getDb();
    const currentActive = db.adminPasscode || DEFAULT_PASSCODE;
    const body = await req.json();

    const { action, passcode, currentPasscode, newPasscode } = body;

    // Action 1: Verify passcode
    if (action === 'verify') {
      if (passcode === currentActive) {
        return NextResponse.json({ success: true, message: 'Authenticated' });
      } else {
        return NextResponse.json({ success: false, error: 'Koodiin iccitii dogoggora!' }, { status: 401 });
      }
    }

    // Action 2: Change passcode
    if (action === 'change') {
      if (!newPasscode || newPasscode.trim().length < 4) {
        return NextResponse.json({ 
          success: false, 
          error: 'Koodiin haaraa yoo xiqqaate qubee/lakkoofsa 4 ta\'uu qaba.' 
        }, { status: 400 });
      }

      if (currentPasscode !== currentActive) {
        return NextResponse.json({ 
          success: false, 
          error: 'Koodiin ammaa (current passcode) dogoggora!' 
        }, { status: 401 });
      }

      db.adminPasscode = newPasscode.trim();
      persistDb();

      return NextResponse.json({ 
        success: true, 
        message: 'Koodiin iccitii milkaa\'inaan jijjiirameera!' 
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getDb, persistDb } from '@/lib/db';

const DEFAULT_CEO_PASSCODE = 'misbah123abc';
const DEFAULT_EDU_PASSCODE = 'ustaz123';

export async function GET() {
  const db = getDb();
  const ceoPasscode = db.adminPasscode || DEFAULT_CEO_PASSCODE;
  const eduPasscode = db.educationPasscode || DEFAULT_EDU_PASSCODE;

  return NextResponse.json({ 
    active: true,
    ceoPasscode,
    educationPasscode: eduPasscode
  });
}

export async function POST(req: Request) {
  try {
    const db = getDb();
    const currentCeoActive = db.adminPasscode || DEFAULT_CEO_PASSCODE;
    const currentEduActive = db.educationPasscode || DEFAULT_EDU_PASSCODE;
    const body = await req.json();

    const { action, passcode, target, currentPasscode, newPasscode } = body;

    // Action 1: Verify passcode and determine role
    if (action === 'verify') {
      const entered = (passcode || '').trim();

      // Check CEO passcode (Full access)
      if (entered === currentCeoActive || entered === DEFAULT_CEO_PASSCODE) {
        return NextResponse.json({ 
          success: true, 
          role: 'SUPER_ADMIN', 
          sector: 'ALL',
          name: 'Misbah Sheikh Husein (CEO & Founder)',
          message: 'Seensa Guutuu (Full Admin Access)'
        });
      }

      // Check Islamic Education Admin passcode (Restricted access to /admin/education)
      if (entered === currentEduActive || entered === DEFAULT_EDU_PASSCODE) {
        return NextResponse.json({ 
          success: true, 
          role: 'ISLAMIC_EDUCATION_ADMIN', 
          sector: 'EDUCATION',
          name: 'Bulchiinsa Barnoota Islaamaa (Islamic Education Admin)',
          message: 'Seensa Barnoota Islaamaa Qofa (Education Sector Access)'
        });
      }

      return NextResponse.json({ 
        success: false, 
        error: 'Koodiin iccitii dogoggora! Irra deebi\'aa yaalaa.' 
      }, { status: 401 });
    }

    // Action 2: Change passcode (either CEO or Education)
    if (action === 'change') {
      const enteredCurrent = (currentPasscode || '').trim();
      const enteredNew = (newPasscode || '').trim();
      const roleTarget = target || 'ceo'; // 'ceo' or 'education'

      if (!enteredNew || enteredNew.length < 4) {
        return NextResponse.json({ 
          success: false, 
          error: 'Koodiin haaraa yoo xiqqaate qubee/lakkoofsa 4 ta\'uu qaba.' 
        }, { status: 400 });
      }

      if (roleTarget === 'education') {
        // Changing Education passcode (authorized by current education passcode or CEO passcode)
        const isAuthorized = enteredCurrent === currentEduActive || enteredCurrent === DEFAULT_EDU_PASSCODE || enteredCurrent === currentCeoActive;
        if (!isAuthorized) {
          return NextResponse.json({ 
            success: false, 
            error: 'Koodiin ammaa (Current Passcode) dogoggora!' 
          }, { status: 401 });
        }

        db.educationPasscode = enteredNew;
        persistDb();

        return NextResponse.json({ 
          success: true, 
          target: 'education',
          message: 'Koodiin iccitii Barnoota Islaamaa milkaa\'inaan jijjiirameera!' 
        });
      } else {
        // Changing CEO passcode
        if (enteredCurrent !== currentCeoActive && enteredCurrent !== DEFAULT_CEO_PASSCODE) {
          return NextResponse.json({ 
            success: false, 
            error: 'Koodiin ammaa (Current Passcode) dogoggora!' 
          }, { status: 401 });
        }

        db.adminPasscode = enteredNew;
        persistDb();

        return NextResponse.json({ 
          success: true, 
          target: 'ceo',
          message: 'Koodiin iccitii CEO milkaa\'inaan jijjiirameera!' 
        });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

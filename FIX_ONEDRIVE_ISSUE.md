# Fix OneDrive EPERM Error

## Problem
OneDrive is trying to sync the `.next` folder, causing file lock errors (EPERM).

## Solution

### Option 1: Exclude .next from OneDrive (Recommended)

1. **Right-click on the `.next` folder** in File Explorer
2. Select **"Always keep on this device"** or **"Free up space"**
3. Or go to OneDrive Settings → Sync → Advanced → **"Choose folders"** and uncheck `.next`

### Option 2: Move Project Outside OneDrive

Move your project to a location NOT synced by OneDrive:
- `C:\Projects\thob\` (recommended)
- `C:\dev\thob\`
- Any folder NOT in OneDrive

### Option 3: Pause OneDrive Temporarily

1. Right-click OneDrive icon in system tray
2. Click **"Pause syncing"** → **"2 hours"**
3. Work on your project
4. Resume syncing later

## Files Created

- `.onedriveignore` - Tells OneDrive to ignore certain files
- `.gitignore` - Standard Git ignore file

## After Fixing

1. Delete `.next` folder manually
2. Restart dev server: `npm run dev`
3. The error should be gone!

---

**Note:** The product page is now optimized with Server Components for instant loading! 🚀



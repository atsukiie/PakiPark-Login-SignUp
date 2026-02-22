# Frontend README

This is the Next.js frontend for the PakiPark login page.

## Quick Start (Windows PowerShell)

1. Go to this folder:
```powershell
cd D:\PakiPark-Login-SignUp\PakiPark-Login-SignUp\LoginSignUpCode\frontend
```

If your project is on Drive C, use:
```powershell
cd C:\path\to\PakiPark-Login-SignUp\PakiPark-Login-SignUp\LoginSignUpCode\frontend
```

2. Install packages (first time only):
```powershell
npm install
```

3. Run the app:
```powershell
npm run dev -- --port 3000
```

4. Open the login page:
```text
http://localhost:3000/login
```

You can also open:
```text
http://localhost:3000/
```

If the page stops loading later, run this again in the same folder:
```powershell
npm run dev -- --port 3000
```

## If Your Project Is On Drive C

Use the same steps, but change the path:

```powershell
cd C:\path\to\PakiPark-Login-SignUp\PakiPark-Login-SignUp\LoginSignUpCode\frontend
npm run dev -- --port 3000
```

If you need to switch drives first:

```powershell
C:
cd \path\to\PakiPark-Login-SignUp\PakiPark-Login-SignUp\LoginSignUpCode\frontend
```

## Common Problems

### `cd frontend` says path not found
You are in the wrong folder. Use the full `cd` command in step 1 first.

### 404 page
- Use `/login` or `/` in the URL, not `/frontend`.
- Make sure the server is running in the `LoginSignUpCode/frontend` folder.
- Hard refresh with `Ctrl+F5`.

### Port is already in use
Close the process using port 3000, then run again on 3000:
```powershell
npm run dev -- --port 3000
```

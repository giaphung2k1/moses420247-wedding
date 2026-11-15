const SHEET_NAME = 'RSVP Responses';
// Replace this with the ID from your Google Sheets URL (the part between /d/ and /edit).
const SPREADSHEET_ID = '1Ge26f_plNeq8vvUBfOVkiUgz7542WG6hA0rAKULB_FE';
const HEADERS = [
  'Timestamp',
  'Guest name',
  'Email',
  'Mobile',
  'Attendance',
  'Invited guests',
  'Song request',
  'Message'
];

function doPost(e) {
  const params = (e && e.parameter) || {};
  const name = clean_(params['Guest name'], 150);
  const email = clean_(params.Email, 254);
  const attendance = clean_(params.Attendance, 80);

  if (!name || !email || !attendance) {
    return ContentService.createTextOutput('Missing required fields');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      safeCell_(name),
      safeCell_(email),
      safeCell_(clean_(params.Mobile, 80)),
      safeCell_(attendance),
      safeCell_(clean_(params['Invited guests'], 1000)),
      safeCell_(clean_(params['Song request'], 200)),
      safeCell_(clean_(params.Message, 2000))
    ]);
  } finally {
    lock.releaseLock();
  }

  return ContentService.createTextOutput('OK');
}

function clean_(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

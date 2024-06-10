////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function main() {

  // Add script functionality here

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADDITIONAL FUNCTIONALITIES BELOW

// Custom Date Range Functionality
function last_n_days(n) {
  var from = new Date();
  var to = new Date();
  to.setDate(to.getDate() - n);
  from.setDate(from.getDate() - 1);

  return google_date_range(to, from);
} // function last_n_days()


function google_date_range(from, to) {

  function google_format(date) {
    var date_array = [
      date.getUTCFullYear(),
      (date.getUTCMonth() + 1).toString().padStart(2, '0'),
      date.getUTCDate().toString().padStart(2, '0')
    ];
    return date_array.join('');
  }

  var inverse = (from > to);
  from = google_format(from);
  to = google_format(to);
  var result = [from, to];

  if (inverse) {
    result = [to, from];
  }

  return result.join(',');
} // function google_date_range()


// Sheet Creation
function checkTab(file) {
  var spreadsheet = SpreadsheetApp.openById(file.getId());
  var currentDate = new Date();
  var sheetName = currentDate.toISOString().slice(0, 10);

  var tab = spreadsheet.getSheetByName(sheetName);
  if (tab) {
    if (config.LOG === true) {
      Logger.log("Selected tab " + sheetName);
    }
  } else {
    tab = spreadsheet.insertSheet(sheetName);
    if (config.LOG === true) {
      Logger.log("Created tab " + sheetName);
    }
  }

  var defaultSheetDutch = spreadsheet.getSheetByName("Blad1");
  if (defaultSheetDutch) {
    spreadsheet.deleteSheet(defaultSheetDutch);
  }

  var defaultSheetEnglish = spreadsheet.getSheetByName("Sheet1");
  if (defaultSheetEnglish) {
    spreadsheet.deleteSheet(defaultSheetEnglish);
  }

  return tab;
} // function checkTab


// Send Email Functionality
var recipientEmails = config.EMAIL_ADDRESSES.split(',');
var subject = config.EMAIL_SUBJECT;
var body = config.EMAIL_BODY;

MailApp.sendEmail(recipientEmails.join(','), subject, body);

// Spreadsheet Formatting
function formatSheet(sheet) {
  Logger.log("Starting formatSheet function");

  if (!sheet) {
    Logger.log("Error: The sheet object is not valid.");
    return;
  }
  Logger.log("Sheet name: " + sheet.getName());
  Logger.log("Sheet rows: " + sheet.getLastRow() + ", columns: " + sheet.getLastColumn());

  var headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  Logger.log("Header Range: " + headerRange.getA1Notation());
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4caf50');
  headerRange.setFontColor('white');
  sheet.autoResizeColumns(1, sheet.getLastColumn());
  Logger.log("Completed formatSheet function");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

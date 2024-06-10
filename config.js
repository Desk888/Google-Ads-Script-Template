////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Configurations
let config = {
  DATE_RANGE: last_n_days(30), // Choose the date range (just numbers)
  SPREADSHEET_URL: "", // Only include URL until /edit
  EMAIL_ADDRESSES: "", // Add email addresses
  EMAIL_SUBJECT: "", // Add the subject to your email
  EMAIL_BODY: "Enter the body of your email text here" +
  config.SPREADSHEET_URL +
 "\n\nReport covers the last " +
  config.DATE_RANGE +
 " days." +
 "\n\nThis is an automated email sent by Google Ads Script.";
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

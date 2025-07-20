// This file will be used directly by Docker

// --------------- Your Credentials ---------------
export const lastName = "LAM";
export const driverLicenseNumber = "02041185";
export const keyWord = "lam";

// --------------- Location ---------------
// To select the driving centre you want (e.g. North Vancouver ICBC), you can specify its details below.
// If you know the exact name or address as it appears on the ICBC site, use that for best results.

// Example for North Vancouver ICBC:
export const citySpelledOut = ["North", " Vancouver", ", BC"]; // e.g. ["North", " Vancouver", ", BC"]
export const cityFullName = citySpelledOut.join(""); // "North Vancouver, BC"

// You can also specify the branch's street name as it appears on the ICBC site.
// For North Vancouver ICBC, the address is typically "1331 Marine Dr".
export const branchStreetNames = ["1331 Marine Dr"]; // e.g. ["1331 Marine Dr"]

// --------------- IMAP for Email Automation --------------- (optional - For Full Automation)
export const email = "auggieldoggie@gmail.com";
export const passwordOfEmail = "RG=u,8UsO7>u";
export const imapServer = "imap.gmail.com";
export const imapPort = 993;

// --------------- Logic for finding appointment ---------------
// You can add/remove more logic here to decide if the appointment is accepted or not.
export const logic = (acceptIfIs) =>
  acceptIfIs.After(new Date().toISOString().split('T')[0]); // Accept any appointment after today

// --------------- Intervals and waiting times (times are in milliseconds) ---------------
export const intervalBetweenEachRefresh = 1000; // Time between each refresh during active searching

// --------------- Anti-Rate Limiting Protection ---------------
export const checkInterval = 30 * 60 * 1000; // 30 minutes between each check cycle
export const enableRandomDelay = true; // Add random delay to avoid detection
export const minRandomDelay = 5 * 1000; // Minimum random delay (5 seconds)
export const maxRandomDelay = 15 * 1000; // Maximum random delay (15 seconds)
export const maxAttemptsBeforeBreak = 10; // Maximum attempts before taking a longer break
export const breakDuration = 5 * 60 * 1000; // 5 minute break after max attempts

// Fetching verification code from email
export const totalAttemptsForFetchingVerificationCode = 3;
export const intervalBetweenEachFetchingVerificationCodeFromEmail = 1000; // (can be 0)

// --------------- Prompt for user input ---------------
export const promptMeAndWaitForMyRestartCall = false; // If true, the bot will wait for your call to either enter the validation code MANUALLY or continue looking for appointment.
// If false, the bot will just restart the process and tries to find an appointment from scratch, again. (It won't stop and wait for your call).

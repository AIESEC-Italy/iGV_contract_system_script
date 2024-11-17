function onFormSubmit(e) {
  const submittedRow = e.range.getRow();
  processRow(submittedRow);
}

function processRow(rowIndex) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
  const data = sheet.getDataRange().getValues();
  const headers = data[0]; // Assume headers are in the first row

  Logger.log(headers);

  // Define column indices for template selection and 'Done' status
  const languageCol = 1;
  const typeCol = headers.indexOf("Contract type");
  const lcName = headers.indexOf("LC Name");
  const statusCol = headers.indexOf("Email sent?");

  // Define template IDs for each language/type combination
  const templates = {
    "English_AGREEMENT_FOR_THE_REALIZATION": '',
    "English_TCSxiGV": '',
    "Italian_AGREEMENT_FOR_THE_REALIZATION": '',
    "Italian_TCSxiGV": ''
  };

  const row = data[rowIndex - 1]; // Adjust for 0-indexed array
  if (row[statusCol] === "Done") return; // Skip if already marked "Done"

  const destinationFolderId = lcsFolders[row[lcName]];
  const language = row[languageCol];
  const type = row[typeCol];
  const templateKey = `${language}_${type}`;
  const templateId = templates[templateKey] || templates["English_AGREEMENT_FOR_THE_REALIZATION"]; // Default template if no match

  // Create a copy of the selected template
  const templateFile = DriveApp.getFileById(templateId);
  const destinationFolder = DriveApp.getFolderById(destinationFolderId);
  const copiedFile = templateFile.makeCopy(destinationFolder);
  const docId = copiedFile.getId();
  const doc = DocumentApp.openById(docId);
  const body = doc.getBody();

  // Replace placeholders with row values (assuming each header is a placeholder field)
  headers.forEach((header, colIndex) => {
    if(slots.indexOf(header) >= 0 && row[colIndex] == ""){
        body.replaceText(`{{${contract_variables[header]}}}`, "N/A");
    }
    if (header && row[colIndex]) {
      let value = row[colIndex];

      

      if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
        const day = String(value.getDate()).padStart(2, '0');
        const month = String(value.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = value.getFullYear();
        value = `${day}/${month}/${year}`;
      }

      body.replaceText(`{{${contract_variables[header]}}}`, value);
    }
  });

  // Save and convert the document to PDF
  doc.saveAndClose();
  const pdfFile = DriveApp.getFileById(docId).getAs('application/pdf');
  const savedFile = destinationFolder.createFile(pdfFile).setName(`${row[12]}_${templateKey}` + '.pdf');

  // Optionally, delete the original Google Doc copy
  DriveApp.getFileById(docId).setTrashed(true);

  const subject = `iGV contract for ${row[12]}`;
  const messageBody = `Dear ${row[4]},\n\nPlease find attached the contract.\n\nBest regards`;

  MailApp.sendEmail({
    to: row[6],
    cc: mcvpIGV,
    subject: subject,
    body: messageBody,
    attachments: [savedFile]
  });

  // Mark the row as "Done" in the status column
  sheet.getRange(rowIndex, statusCol + 1).setValue("Done");
}

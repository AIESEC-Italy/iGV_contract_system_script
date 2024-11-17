const referenceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reference")
const referenceSheetData = referenceSheet.getRange(1,1,referenceSheet.getLastRow(),referenceSheet.getLastColumn()).getValues()
// LC Codes from Expa padded with 0 on the left
const lcMap = {
  "Venezia": "1389", // 0 
  "Torino": "1004",  // 1
  "Pavia": "1117",   // 2
  "Padova": "83",   // 3
  "Milano": "930",  // 4
  "Trento": "1370",  // 5
  "Bologna": "96", // 6
  "Bari": "865",  // 7
  "Brescia": "1641",  // 8
  "Roma Sapienza": "754",  // 9
  "Perugia (Closed)": "2326", // 10
  "Napoli Federico II": "1035", // 11
  "Catania": "878",  // 12
  "Roma Tre": "821", // 13
  "PoliTO": "2322", // 14
  "Trieste": "689",  // 15
  "MC Italy": "3708",  // 16
  "ITALIA": "2306", // 17
}
const lcsFolders = {
  "Venezia": "",
  "Torino": "",  
  "Pavia": "",   
  "Padova": "",   
  "Milano": "",  
  "Trento": "",  
  "Bologna": "",
  "Bari": ",  
  "Brescia": "",  
  "Roma Sapienza": "",  
  "Napoli Federico II": "", 
  "Catania": "",  
  "Roma Tre": "", 
  "PoliTO": "", 
  "Trieste": ""
}
const mcvpIGV = "arianna.maschio@aiesec.it"
const dateFormat = "yyyyddMM"


const contract_variables = {
  "Partner Entity Name": "partner_name",
  "AIESECer Email": "aiesecer_email",
  "Name of the legal representative of the LC ": "lcp_name",
  "AIESECer Phone": "phone",
  "LC Address": "lc_address",
  "Project Name": "project_name",
  "LC Name": "lc_name",
  "Week#1 activities": "week1",
  "Week#2  activities": "week2",
  "Week#3  activities": "week3",
  "Week#4  activities": "week4",
  "Week#5  activities": "week5",
  "Week#6  activities": "week6",
  "Objectives of the project": "project_objectives",
  "Sezionale": "Sezionale",
  "PARTNER ENTITY PROTOCOL NUMBER": "partner_protocol_number",
  "Progressive number of the contract": "number_of_contract",
  "Partner Address": "Address",
  "Project Start Date": "project_start_date",
  "Project End Date": "project_end_date",
  "Number of opens in The 1st slot": "opens_slot_1",
  "1st slot Start Date": "slot_one_start_date",
  "1st slot End Date": "slot_one_end_date",
  "Number of opens in the 2nd slot": "opens_slot_2",
  "2nd slot Start Date": "slot_two_start_date",
  "2nd slot End Date": "slot_two_end_date",
  "Number of opens in the 3rd slot": "opens_slot_3",
  "3rd slot Start Date": "slot_three_start_date",
  "3rd slot End Date": "slot_three_end_date",
  "Number of opens in the 4th slot": "opens_slot_4",
  "4th slot Start Date": "slot_four_start_date",
  "4th slot End Date": "slot_four_end_date",
  "Partner representative": "partner_represented",
  "Partner representative email": "partner_email",
  'The costs of the project (Unit Cost) "in case of TCS put 200"': "cost_per_ep",
  "Total amount ": "total",
  "C.F": "cf",
  "VAT Code": "vat_code",
  "SD code": "sd_code",
  "PEC address": "pec_address",
  "codice univoco ufficio":	"cuu",
  "codice identificativo gara":	"gis",
  "PROJECT THEMATICS" : "project_thematics", 
};


const slots = [
  "Number of opens in the 2nd slot",
  "2nd slot Start Date",
  "2nd slot End Date",
  "Number of opens in the 3rd slot",
  "3rd slot Start Date",
  "3rd slot End Date",
  "Number of opens in the 4th slot",
  "4th slot Start Date",
  "4th slot End Date"
]

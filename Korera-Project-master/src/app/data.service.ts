import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CSVRecord } from './dataStructure';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
public title:string="";
public titleObservable = new  Subject<string>();

public login;
status:string;
currentProj: string;
public projects = [
  {pname:"Project 1", name: ["General 1","GR2"], code:["10001","10002"] },
  {pname:"Project 2", name: ["General 3","GR4"], code:["10003","10004"]},
  {pname:"Work 1", name: ["General 3","GR7"], code:["10003","10007"]},
  {pname:"Work 2", name: ["General 3","GR8","DM"], code:["10003","10008", "21021"]},
  {pname:"Secret File", name: ["I hate this"], code:["000000"]}
];
resources: object[] = [];
fieldArray: object[] = [];
scopeFields: string[] = [];
//data got chosen
public ExportData: any[] = [];
//orgin data
public ServData: any[] = [];


// setters and getters to access Resources data
saveResourcesData(obj: object[]): void {
  this.resources = obj;
}

getResourcesData(): object[] {
  return this.resources;
}

getScopeFields(): string[] {
  return this.scopeFields;
}
getFieldArray(): any[] {
  return this.fieldArray;
}
setFieldArray(a: object[]) {
  this.fieldArray = a;
}
setScopeFields(a: string[]) {
  this.scopeFields = a;
}
geLoginCheck(){
  return this.login;
}
// to provide data to left table in Project page
getResourcesList() {

}

setProjectItems(items) {

}


setLogin(){
  this.login = true;
}
emitTitle(){
  this.titleObservable.next(this.title);
  console.log(this.title);

}


// constructor(){
//   this.getRecords();
// }
// public records: any[] = [];
//
//  @ViewChild('csvReader')
//  csvReader: any;
//  uploadListener($event: any): void {
//
//   let text = [];
//   let files = $event.srcElement.files;
//   console.log(files);
//
//   if (this.isValidCSVFile(files[0])) {
//
//       let input = $event.target;
//       console.log(files);
//       console.log(input);
//
//       let reader = new FileReader();
//       reader.readAsText(input.files[0]);
//       //let a = new File(["one,two"],'src/assets/data.csv');
//       //console.log(a);
//       //reader.readAsText(a);
//       reader.onload = () => {
//         let csvData = reader.result;
//         let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
//
//         let headersRow = this.getHeaderArray(csvRecordsArray);
//
//         this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
//         console.log(this.records);
//       };
//       reader.onerror = function () {
//         console.log('error is occured while reading file!');
//       };
//
//     } else {
//       alert("Please import valid .csv file.");
//       this.fileReset();
//     }
//   }
//
//   getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
//   let csvArr = [];
//
//   for (let i = 1; i < csvRecordsArray.length; i++) {
//         let curruntRecord = (<string>csvRecordsArray[i]).split(',');
//         if (curruntRecord.length == headerLength) {
//           let csvRecord: CSVRecord = new CSVRecord();
//           csvRecord.cost_code = curruntRecord[0].trim();
//           csvRecord.name = curruntRecord[1].trim();
//
//           csvArr.push(csvRecord);
//         }
//       }
//       return csvArr;
//     }
//
//     isValidCSVFile(file: any) {
//     return file.name.endsWith(".csv");
//   }
//
//   getHeaderArray(csvRecordsArr: any) {
//     let headers = (<string>csvRecordsArr[0]).split(',');
//     let headerArray = [];
//     for (let j = 0; j < headers.length; j++) {
//       headerArray.push(headers[j]);
//     }
//     return headerArray;
//   }
//
//   fileReset() {
//     this.csvReader.nativeElement.value = "";
//     this.records = [];
//   }
//
//   getRecords(){
//     return this.records;
//   }


// Http get Fail ti parse data

 //  constructor(private http: HttpClient) {
 //  }
 //
 // csvUrl: string = '../assets/data.csv';  // URL to web API
 // csvData: any[] = [];
 //
 // readCsvData () {
 //    this.http.get(this.csvUrl)
 //    .subscribe(
 //      data => this.extractData(data),
 //      err => this.handleError(err)
 //    );
 //  }
 //
 //
 //  private extractData(res: Response) {
 //
 //   let csvData = res['_body'] || '';
 //   let allTextLines = csvData.split(/\r\n|\n/);
 //   let headers = allTextLines[0].split(',');
 //   let lines = [];
 //
 //   for ( let i = 0; i < allTextLines.length; i++) {
 //       // split content based on comma
 //       let data = allTextLines[i].split(',');
 //       if (data.length == headers.length) {
 //           let tarr = [];
 //           for ( let j = 0; j < headers.length; j++) {
 //               tarr.push(data[j]);
 //           }
 //           lines.push(tarr);
 //       }
 //   }
 //   this.csvData = lines;
 // }
 //
 // private handleError (error: any) {
 //   // In a real world app, we might use a remote logging infrastructure
 //   // We'd also dig deeper into the error to get a better message
 //   let errMsg = (error.message) ? error.message :
 //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
 //   console.error(errMsg); // log to console instead
 //   return errMsg;
 // }
}

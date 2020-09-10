
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
//import { csvData } from './mockdata';
import { CSVRecord } from '../dataStructure';
import { DataService } from '../data.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-resource-page',
  templateUrl: './resource-page.component.html',
  styleUrls: ['./resource-page.component.css']
})
export class ResourcePageComponent implements OnInit, OnDestroy {
  p: number = 1;
  constructor(private service: DataService) { }
  // public records: any[] = [];

  @ViewChild('csvReader')
  found = [];
  csvReader: any;
  imported: boolean = false;
  listItem: any[];
  num = 2;
  importList: any[] = [];
  // rowBlank: boolean;
  title = 'TableDemo2';
  records: any[] = [{ "name": "General Requirement1", "cost_code": "010000" },
  { "name": "GR4", "cost_code": "020001" },
  { "name": "General Requirement2", "cost_code": "010002" },
  { "name": "GR5", "cost_code": "020002" },
  { "name": "General Requirement3", "cost_code": "010003" }];
  newEdit: boolean;
  columns: string[];
  fieldsBeingEdited: number;
  editMap: Object;
  tempObj: Object;
  inputValue: string;
  empty: any[] = [];
  searchText = "";
  list = [];

  ngOnInit() {
    //this.data = csvData;
    this.newEdit = false;
    this.inputValue = "";
    this.columns = Object.keys(this.records[0]);
    console.log(this.columns)
    this.fieldsBeingEdited = 0;
    this.editMap = {};
    this.tempObj = {};
    this.importList = [];
    // this.rowBlank = true;
    // initialize tempObj
    for (let c of this.columns) {
      this.tempObj[c] = "";
    }
    // initialize editMap
    for (let c of this.columns) {
      if (!this.editMap.hasOwnProperty(c)) this.editMap[c] = false;
    }
    // if (this.fieldsBeingEdited > 0) return;
    // // make editable input visible
    // // this.newEdit = true;
    // if (this.rowBlank) this.rowBlank = false;
    // this.fieldsBeingEdited = this.columns.length;

    /*search*/
    if (this.searchText == "") {
       this.list = this.records;
    }
    else {
      this.list = this.getFound();
    }
  }
  ngOnDestroy() {
    this.service.ServData = this.records;

  }

  getFound() {
    return this.found;
  }
  getRecords() {
    if (this.searchText == "") { return this.list = this.records; }
    else {
      this.findItem();
      return this.list = this.getFound();
    }
  }

  // create temporary object to hold info, and push to data array
  // should not create another empty row if newEdit is true
  // view should should jump to bottom of page - should padding (comprised of empty rows)
  // be added for easier viewing?
  addItem() {
    // let el = document.getElementById("editable-row");
    // window.scrollTo(0,el.scrollHeight)
    this.newEdit = true;

    console.log('adding item: ', this.newEdit);
    // while row is being edited don't add another row
    if (this.fieldsBeingEdited > 0) return;
    // make editable input visible
    this.newEdit = true;
    // if (this.rowBlank) this.rowBlank = false;
    this.fieldsBeingEdited = this.columns.length;
  }
  // add a new table row at bottom -> model updates view with empty new row
  // should insert an editable span with circular submit and delete buttons on left
  // use border-radius: 50%
  submitEntry(col, val) {
    console.log(col + " submitted: " + val)
    // make sure that at least one other column is not blank
    if (val === "") {
      let nonblanks = Object.values(this.tempObj).filter(el => el !== "");
      if (!nonblanks.length) return;
    }
    // overwrite contents of tempObj with submitted (non-blank) inputs
    // destroy the temporary edit field elements
    // if (event.target.value === "") return;
    this.editMap[col] = true;
    this.tempObj[col] = val;
    console.log(this.tempObj);
    this.fieldsBeingEdited -= 1;
    if (this.fieldsBeingEdited === 0) {
      let nonblanks = Object.values(this.tempObj).filter(el => el !== "");
      if (!nonblanks.length) {
        // this.rowBlank = true;
        // ** newEdit needs to be reset after conclusion of any row edit **
        this.newEdit = false;
        return;
      }
      this.records.push(this.tempObj);
      this.tempObj = {};
      this.persistData(this.records);
      console.log("data persisted to DataService");
      // reinsert keys into tempObj
      for (let c of this.columns) {
        this.tempObj[c] = "";
      }
      // **reset editMap (otherwise inputs won't be visible) **
      for (let c of Object.keys(this.editMap)) {
        this.editMap[c] = false;
      }
      this.newEdit = false;
    }
    console.log("fieldsBeingEdited === 0?" + (this.fieldsBeingEdited === 0))
    console.log(this.records)
    console.log("newEdit reset to false?: " + (this.newEdit === false))

  }
  // if user deletes input, hide the editable table row
  cancelEntry(col) {
    console.log(col + " cancelled");
    // record end of editing
    this.editMap[col] = true;
    this.fieldsBeingEdited--;
    if (this.fieldsBeingEdited === 0) {
      console.log(this.tempObj);
      let nonblanks = Object.values(this.tempObj).filter(el => el !== "");
      if (!nonblanks.length) {
        // this.rowBlank = true;
        // ** newEdit needs to be reset after conclusion of any row edit **
        this.newEdit = false;
        console.log("cancelling last empty column: " + this.newEdit);
        for (let c of Object.keys(this.editMap)) {
          this.editMap[c] = false;
        }
        return;
      }

      this.records.push(this.tempObj);
      console.log("data pushed to array " + this.fieldsBeingEdited)
      this.tempObj = {};
      this.persistData(this.records);
      console.log("data persisted to DataService");

      // reinsert keys into tempObj
      for (let c of this.columns) {
        this.tempObj[c] = "";
      }
      // **reset editMap (otherwise inputs won't be visible) **
      for (let c of Object.keys(this.editMap)) {
        this.editMap[c] = false;
      }
      this.newEdit = false;
    }
    console.log("fieldsBeingEdited === 0?" + (this.fieldsBeingEdited === 0))
    console.log(this.records)
    // console.log("newEdit reset?: " + this.newEdit)
  }

  addColumn() {
    // add new key to each member of data array to update view
    let c_name = prompt("Please provide a column name");
    console.log(c_name)
    if (c_name != null && c_name != "") {
      for (let d of this.records) { d[c_name] = ""; }
      // this.columns.push(c_name);
      this.columns = [...this.columns.slice(), c_name];
      /** add new column as new key in tempObj **/
      if (!this.tempObj.hasOwnProperty(c_name)) this.tempObj[c_name] = "";
      /** add new column as new key in editMap **/
      if (!this.editMap.hasOwnProperty(c_name)) this.editMap[c_name] = false;
      // this.columns = Object.keys(this.data[0]);
      console.log(this.columns)
      // if we are editing a row, add one to count of fields still untouched
      if (this.newEdit) this.fieldsBeingEdited += 1;
      // if we are not editing a row, persist to DataService with flag "new_column"
      else {
        this.persistData(this.records);
        console.log("data persisted to DataService");
      }
      this.num = this.num + 1;
    }
  }

  /// persist data to DataService so it can be used by Project Page component
  persistData(records: object[]) {
    // DataService should update all columns
    this.service.saveResourcesData(records);
  }

  ///read  csv file

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;
    console.log(files);

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      console.log(files);
      console.log(input);

      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      //let a = new File(["one,two"],'src/assets/data.csv');
      //console.log(a);
      //reader.readAsText(a);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        //console.log(this.records);
        this.imported = true;
      };
      reader.onerror = function() {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.cost_code = curruntRecord[0].trim();
        csvRecord.name = curruntRecord[1].trim();

        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

  findItem() {
    this.searchText.toLowerCase();
    this.found = [];
    let lengthInput = this.searchText.length;
    //console.log(text);
    for (var i = 0; i < this.records.length; i++) {
      let temp = this.records[i];
      //console.log(temp);
      let tempname = temp.name;
      //console.log(tempname);
      let subString = "";
      if (tempname.length >= lengthInput) {
        let j = 0;
        while (j < lengthInput) {
          subString += tempname.charAt(j);
          j++;
        }
        //console.log(subString);
        subString = subString.toLowerCase();
        if (subString === this.searchText) {
          this.found.push(temp);
          //console.log(temp);
        }
        subString = "";
      }
    }
  }
}

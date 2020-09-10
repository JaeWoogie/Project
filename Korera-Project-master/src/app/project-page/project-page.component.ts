import { Component, OnInit,OnDestroy } from "@angular/core";
// import { csvData } from './mockdata';
// import { CSVRecord } from './dataStructure';
import { Router } from  '@angular/router';
import {DataService} from '../data.service'
@Component({
  selector: "app-project-page",
  templateUrl: "./project-page.component.html",
  styleUrls: ["./project-page.component.css"]
})
export class ProjectPageComponent implements OnInit,OnDestroy {

  constructor (private service: DataService, private router: Router) { }
  p: number = 1;
  num;
  column: string[];
  deleteSelected = [];
  projectData = [];
  exports: object[] = [];
  checkData: any;
  selectedAll: any;
  dataChecked = [];
  selected = [];
  keys: Set<string>;

  page: number;
  checked: boolean;
  unchecked:boolean;
  checkme: boolean;
  itemPerPage = 10;
  show: boolean = false;

  checked_row: boolean = false;
  unchecked_row: boolean = false;
  data: any[] = [];
  projects = [];
  searchText = "";
  list = [];
  found = [];
  display:string = "Project";
  ProjExports: object[] = [];

  ngOnInit(): void {
    // this.selected = false;
    this.projects = this.service.projects;
    this.data = this.service.ServData;
    this.column = Object.keys(this.data[0]);
    this.num = this.column.length;
    for (let k of Object.keys(this.data)) {
      this.data[k]['checked'] = false;
    }
    if (this.searchText == "") {
       this.list = this.projects;
    }
    else {
      this.list = this.getFound();
    }
    this.service.title = "PROJECT";
    this.service.emitTitle();
    // this.exports = this.ProjExports;
  }

  getProjects() {
    if (this.searchText == "") { return this.list = this.projects; }
    else {
      this.findItem();
      return this.list = this.getFound();
    }
  }
  getFound() {
    return this.found;
  }
  selectAll(event: any) {

    for (let i=0; i < this.data.length; ++i) {
      if (!this.data[i]['checked']) this.data[i]['checked'] = true;
    }


  }

  // to deselect all, modify model's data to propagate change to view
  deselectAll(event: any) {
    for (let i=0; i < this.data.length; ++i) {
      if (this.data[i]['checked']) this.data[i]['checked'] = false;
    }
  }

  selectRow(idx: number) {
    if (!this.data[idx]['checked']) this.data[idx]['checked'] = true;
    else this.data[idx]['checked'] = false;

  }

  get selectedCheckbox() {
    return this.data.filter(opt => opt.checked).map(opt => opt.value);
  }

  // fetch Resources from DataService
  getResourcesData() {
    this.service.getResourcesData();
  }

  // export checked items to right table
  //
  exportChecked() {
    console.log('exports fired: ' + this.data[0])
    // get set of unique cost codes
    let checked = this.data.filter( _ => _['checked']===true )
    if (!this.exports.length) {
      this.exports = checked;
    }
    else {
      checked.forEach( (_,i) => {
        // if (!this.keys.has( _['cost_code']))
         this.exports.push( _ );
      })
    }
    this.exports.forEach( _ => _['right-tbl-checked'] = false);
    this.keys = new Set(this.exports.map(el => el['cost_code']));
  }
  toggleExported(idx) {
    if (this.exports[idx]['right-tbl-checked']) this.exports[idx]['right-tbl-checked'] = false;
    else this.exports[idx]['right-tbl-checked'] = true;
  }
  // removes checked item(s) from right table
  removeChecked() {
    console.log('remove check fired')
    // get cost codes of items to be removed
    this.exports = this.exports.filter( _ => _['right-tbl-checked']===false );
    this.keys = new Set(this.exports.map(el => el['cost_code']));
    console.log(this.exports)
  }
  // submit data in right table to DataService
  submitData() {
    console.log(this.exports)

     this.router.navigateByUrl('/formula');
  }
  ngOnDestroy(){
    for( var i = 0 ; i < this.exports.length; i++){
      delete this.exports[i]['right-tbl-checked'];
    }
    for( var i = 0 ; i < this.data.length; i++){
      delete this.data[i]['checked'];
    }
    this.service.ExportData = this.exports;
    this.service.ServData = this.data;

  }
  findItem() {
    this.searchText.toLowerCase();
    this.found = [];
    let lengthInput = this.searchText.length;
    //console.log(text);
    for (var i = 0; i < this.projects.length; i++) {
      let temp = this.projects[i];
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

  getDropDownValue(event: any){
    this.exports = [];
    console.log(event.target, event.target.text);
    let name = event.target.text
    this.display = event.target.text;
    this.service.title = name.toUpperCase();
    this.service.emitTitle();
    // console.log(event.target.value);
    for(var i = 0 ; i < this.projects.length; i++){
      if(this.projects[i].pname == name){
        for(var j = 0; j < this.projects[i].name.length; j++){
          let ob = {};
          ob['name'] = this.projects[i].name[j];
          ob['cost_code'] = this.projects[i].code[j];
          this.exports.push(ob);
        }
      }
      console.log(this.exports)
    }
  }
}

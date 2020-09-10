import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, NgForm } from '@angular/forms';
import {DataService} from '../data.service';
import { TempField } from '../dataStructure';
import { Router } from  '@angular/router';
import {AppComponent} from '../app.component';


interface Field {
  id: number;
  fieldname: string;
  type: string;
  formula: string;
}

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.css']
})

export class TemplatePageComponent {
  // template page should invoke DataService
  form: { fieldArray: Field[]; };
  fieldArray: Field[];
  title = 'TemplatePageDemo';
  fieldTypes: string[];
  scopeFields: any[];
  data: any[] = [];
  dataKey: string[];
  idk;
  // inject DataService provider here
  constructor(private service: DataService, private router: Router) {
    // private service: DataService
    this.form = { fieldArray: [] };
    this.fieldArray= [];
    this.addField();
  }

  getDataScopeField(){
    this.dataKey =  Object.keys(this.data[0]);
    // console.log("data key");
    // console.log(this.dataKey
    let arr=[];
    for (var i = 0; i < this.dataKey.length; i++){
      let temp :TempField = new TempField();
      temp.value = this.dataKey[i];
      temp.checked = false;
      console.log(temp);
      arr.push(temp);
    }
    return arr;
  }
  // use DataService to supply Formula page with list of scope fields
  // each fieldMap entry is an object comprised of the following keys:
  // "field", "type", formula (if type is formula)
  // retrieve current scopeFields and fieldArray from DataService
  ngOnInit() {
    this.data = this.service.ExportData;
    console.log("temp data");
    console.log(this.data);
    this.fieldArray= [];
    this.fieldTypes = ['Number', 'Text', 'Formula']
    this.form.fieldArray = [];
    this.scopeFields = this.getDataScopeField();
    console.log(this.scopeFields)
    for(var i = 0; i < this.scopeFields.length ; i++){
    if(this.scopeFields[i].value == 'name') {
      this.scopeFields[i].checked = true;
    }
  }
    // this.scopeFields = [
    //     {value: 'Name', checked: true },
    //     {value: 'Code', checked: false },
    //     {value: 'Editable', checked: true }
    // ];
    // this.scopeFields = this.ds.getScopeFields()
  }
  // addField creates an object with uninitialized values
  // saveFields needed to persist data to the model, although it's already synced in form model
  // the model will supply the DataService will data needed by Formula component
  addField(): void {
    this.fieldArray.push({
        id: Date.now(),
        fieldname: "",
        type: "Number",
        formula: ""
    })
    //console.log(this.fieldArray)
  }

  removeField(idx: number) {
    console.log('deleting element...')
    this.fieldArray = this.fieldArray.filter((el,i) => i !== idx);
    console.log('element ' + idx + ' deleted')
  }
  onSelect(e: any, idx: number) {
    this.fieldArray[idx]['type'] = e.target.value;
    // this.form.fieldArray[idx]['type'] = e.target.value;
  }
  toggleCheck(idx: number) {
    console.log('onclick fired')
    if (this.scopeFields[idx]['checked']) this.scopeFields[idx]['checked'] = false;
    else this.scopeFields[idx]['checked'] = true;
    //console.log(this.scopeFields);
  }
  // persist current model values to DataService
  saveForm(f: any) {
    console.log(f);
    console.log("scope: " + this.scopeFields);
    console.log("field: " + this.fieldArray);
    let keys = this.scopeFields.filter( _ => _['checked'] ).map(_ => _['value'])
      this.service.setScopeFields(keys)
      this.service.setFieldArray(this.fieldArray)
       //console.log( "key: " + keys);
}
clickSave(){
  this.router.navigateByUrl('/formula');

}

}

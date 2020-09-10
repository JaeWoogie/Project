import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from '../data.service';

@Component({
  selector: "app-formula-page",
  templateUrl: "./formula-page.component.html",
  styleUrls: ["./formula-page.component.css"]
})
export class FormulaPageComponent implements OnInit, OnDestroy {
  constructor(private service: DataService) { }
  hasCal: boolean = false;
  formField = [];
  p: number = 1;
  num = 2;
  column: string[];
  data: any[] = [];
  scope: any[] = [];
  field: any[] = [];
  records: any[] = [];
  data1: any[] = [];
  obj = {};
  ngOnInit(): void {
    this.records = this.service.ExportData;
    console.log(this.records);
    // this.data = this.records;

    console.log(this.num);
    //console.log(this.data);
    //this.data = this.data;
    this.scope = this.service.getScopeFields();
    this.field = this.service.getFieldArray();

    console.log(this.scope);
    console.log(this.field);
    if (this.scope.length != 0 || this.field.length != 0) {
      this.obj = {};
      if (this.scope.length != 0) {
        for (var j1 = 0; j1 < this.scope.length; j1++) {
          let t = this.scope[j1];
          this.obj[t] = "";
        }
      }
      if (this.field.length != 0) {
        for (var j1 = 0; j1 < this.field.length; j1++) {
          let k = this.field[j1].fieldname;
          if (this.field[j1].formula.length == 0) {
            this.obj[k] = "";
          }
          else {
            let f = this.field[j1].formula;
            this.obj[k] = f;
            this.hasCal = true;
            this.formField.push(k);

          }

        }
      }
      for (var i = 0; i < this.records.length; i++) {
        if (i != 0) {
          this.obj = {};
          if (this.scope.length != 0) {
            for (var j1 = 0; j1 < this.scope.length; j1++) {
              let t = this.scope[j1];
              this.obj[t] = "";
            }
          }
          if (this.field.length != 0) {
            for (var j1 = 0; j1 < this.field.length; j1++) {
              let k = this.field[j1].fieldname;
              if (this.field[j1].formula.length == 0) {
                console.log("We got to if of fomular")

                this.obj[k] = "";
              }
              else {
                console.log("We got to else of fomular")
                this.hasCal = true;
                let f = this.field[j1].formula;
                this.obj[k] = f;
                console.log(k);
                console.log("adding k")
                this.formField.push(k);
                console.log(this.formField);

              }
            }
          }
        }
        for (var j = 0; j < this.scope.length; j++) {
          // this.obj = {}
          let n = this.scope[j];
          let value = this.records[i][n];
          this.obj[n] = value;
          //console.log(value);
          // console.log(this.obj[n]);
        }
        this.data.push(this.obj);
        //console.log(this.data);

       console.log(this.hasCal)
       console.log(this.formField)
      //  if(this.formField.size != 0){
      //   for (let f of this.formField) {
      //     let op = "";
      //     console.log(op);
      //     for (var i = 0; i < this.data.length; i++) {
      //       let ob =this.data[i];
      //       let formula = ob[f];
      //       op = formula.replace(/[a-zA-Z]/g, "");
      //       console.log("Operand");
      //       console.log(op);
      //       //this.data[i][f] = " ";
      //     }
      //   }
      //
      // }
    }

      console.log(this.data);

      this.num = (Object.keys(this.data[0])).length;
      this.column = Object.keys(this.data[0]);

       if(this.formField.length != 0){
        for (let f of this.formField) {
          let op = "";
          let op1 = "";
          let op2 = "";
          console.log(op);
          let str = f;
          let count =1;
          if(count < 2 || str != f){
            str = f;
            let ob =this.data[0];
            let formula = ob[f];
            op = formula.replace(/[a-zA-Z]/g, "");

            console.log(op);
            formula = ob[str];
            let operands = formula.split(op);
            op1 = operands[0];
            op2 = operands[1];
            console.log("Operand");
            console.log(op1);
            console.log(op2);
           for (var i = 0; i < this.data.length; i++) {
            let left = this.data[i][op1];
            let right = this.data[i][op2];
            if(left != "" && right !=""){
            let form = left + " " + op + " "+ right;
            this.data[i][f] = eval(form);
           }
          }

          count++;
        }

      }

    }
  }
    else {
      this.data = this.records;
      this.num = (Object.keys(this.data[0])).length;
      this.column = Object.keys(this.data[0]);

    }
 console.log(this.data);

  }

  ngOnDestroy() {
    this.service.ExportData = this.records;
    this.scope = [];
    this.field = [];
    this.data = [];
  }


}

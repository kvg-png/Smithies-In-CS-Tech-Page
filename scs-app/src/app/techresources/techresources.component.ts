import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest.service';

@Component({
  selector: 'app-techresources',
  templateUrl: './techresources.component.html',
  styleUrls: ['./techresources.component.scss']
})
export class TechresourcesComponent implements OnInit {
  clickMessage = '';
  checkMessage = '';
  checkedInfo: any;
  isChecked = true;
  checkboxListTemp: any = [];
  
  checkboxList: any = [
    {id: 'checkConference', printName: 'Conference', value: "conference", isChecked: false},
    {id: 'checkMentoring', printName: 'Mentoring', value: "mentoring", isChecked: false},
    {id: 'checkScholarship', printName: 'Fellowship/Scholarship', value: "fellowship_scholarship", isChecked: false},
    {id: 'checkHackathon', printName: 'Hackathon', value: "hackathon", isChecked: false},
    {id: 'checkAid', printName: 'Financial Support/Aid', value: "financial_support", isChecked: false},
    {id: 'checkPOC', printName: 'POC', value: "poc", isChecked: false},
    {id: 'checkLGBTQ', printName: 'LGBTQ+', value: "lgbtq", isChecked: false},
    {id: 'checkAsian', printName: 'Asian', value: "asian", isChecked: false},
    {id: 'checkBlack', printName: 'Black', value: "black", isChecked: false},
    {id: 'checkLatinX', printName: 'LatinX', value: "latinX", isChecked: false},
    {id: 'checkFirstGen', printName: 'First Generation', value: "firstgen", isChecked: false}
  ]

  constructor(private restApiService: RestApiService) { }

  ngOnInit() {
    console.log('we are querying the database!')
    console.log(this.restApiService.getdbresults());
    this.restApiService.getdbresults().subscribe(data => {
      console.log('retrieved the following data:');
      console.log(data);

    }
    )
  }

  onChangeBox(category: string, isChecked: any){
    this.checkedInfo = isChecked;
    //let data = this.checkboxListTemp.find((item:any) => item.value === category);
    if(isChecked.target.checked){ // no duplicates! (data === null)
        this.checkboxListTemp.push(category);
    } else{
      let index = this.checkboxListTemp.indexOf(category);
      this.checkboxListTemp.splice(index, 1);
    }
  }

  onClear(val: any){ // true means uncheck all
    for(let i = 0; i < this.checkboxList.length; i++){
      this.checkboxList[i].isChecked = !val;
      if(this.checkboxList[i].isChecked){
        this.checkboxListTemp.push(this.checkboxList[i].value);
      }
      else{
        let index = this.checkboxListTemp.indexOf(this.checkboxList[i]);
        this.checkboxListTemp.splice(index, 1);
      }
    }
  }

  onSubmit(){
    this.clickMessage = "Working!";
  }

  onCheck(event: any){
    this.checkMessage += event.target.value + " ";
  }

}

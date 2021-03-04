import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest.service';

@Component({
  selector: 'app-techresources',
  templateUrl: './techresources.component.html',
  styleUrls: ['./techresources.component.scss']
})
export class TechresourcesComponent implements OnInit {

  constructor(private restApiService: RestApiService) { }

  ngOnInit(): void {
    console.log('we are querying the database!')
    console.log(this.restApiService.getdbresults());
    this.restApiService.getdbresults().subscribe(data => {
      console.log('retrieved the following data:');
      console.log(data);

    }
    )
  }

}
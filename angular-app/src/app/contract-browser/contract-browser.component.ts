import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { contractbrowserService} from './contract-browser.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contract-browser',
  templateUrl: './contract-browser.component.html',
  styleUrls: ['./contract-browser.component.css'],
  providers: [contractbrowserService]
})
export class ContractBrowserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { customsInspectionService } from './customsInspection.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-customsinspection',
  templateUrl: './customsInspection.component.html',
  styleUrls: ['./customsInspection.component.css'],
  providers: [customsInspectionService]
})
export class customsInspectionComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  inboundCustomsID = new FormControl('', Validators.required);
  landingDetails = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  validator = new FormControl('', Validators.required);
  OilLot = new FormControl('', Validators.required);

  constructor(public servicecustomsInspection: customsInspectionService, fb: FormBuilder) {
    this.myForm = fb.group({
      inboundCustomsID: this.inboundCustomsID,
      landingDetails: this.landingDetails,
      state: this.state,
      owner: this.owner,
      validator: this.validator,
      OilLot: this.OilLot
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicecustomsInspection.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.trading.customsInspection',
      'inboundCustomsID': this.inboundCustomsID.value,
      'landingDetails': this.landingDetails.value,
      'state': this.state.value,
      'owner': this.owner.value,
      'validator': this.validator.value,
      'OilLot': this.OilLot.value
    };

    this.myForm.setValue({
      'inboundCustomsID': null,
      'landingDetails': null,
      'state': null,
      'owner': null,
      'validator': null,
      'OilLot': null
    });

    return this.servicecustomsInspection.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'inboundCustomsID': null,
        'landingDetails': null,
        'state': null,
        'owner': null,
        'validator': null,
        'OilLot': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.trading.customsInspection',
      'landingDetails': this.landingDetails.value,
      'state': this.state.value,
      'owner': this.owner.value,
      'validator': this.validator.value,
      'OilLot': this.OilLot.value
    };

    return this.servicecustomsInspection.updateAsset(form.get('inboundCustomsID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicecustomsInspection.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicecustomsInspection.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'inboundCustomsID': null,
        'landingDetails': null,
        'state': null,
        'owner': null,
        'validator': null,
        'OilLot': null
      };

      if (result.inboundCustomsID) {
        formObject.inboundCustomsID = result.inboundCustomsID;
      } else {
        formObject.inboundCustomsID = null;
      }

      if (result.landingDetails) {
        formObject.landingDetails = result.landingDetails;
      } else {
        formObject.landingDetails = null;
      }

      if (result.state) {
        formObject.state = result.state;
      } else {
        formObject.state = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.validator) {
        formObject.validator = result.validator;
      } else {
        formObject.validator = null;
      }

      if (result.OilLot) {
        formObject.OilLot = result.OilLot;
      } else {
        formObject.OilLot = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'inboundCustomsID': null,
      'landingDetails': null,
      'state': null,
      'owner': null,
      'validator': null,
      'OilLot': null
      });
  }

}

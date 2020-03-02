import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { contractbrowserService} from './contract-browser.service';
import { OilLotService } from '../OilLot/OilLot.service'
import { shippingTermsService } from '../shippingTerms/shippingTerms.service'
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contract-browser',
  templateUrl: './contract-browser.component.html',
	styleUrls: ['./contract-browser.component.css'],
  providers: [contractbrowserService,OilLotService,shippingTermsService]
})
export class ContractBrowserComponent implements OnInit {

	myForm: FormGroup;

	public allAssets;
	public subContracts = {};
	public shippingTerm = {};
	public lotInfo = {};
  public asset;
  public currentId;
	public errorMessage;

	isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  contractID = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  oilLot = new FormControl('', Validators.required);
  tradeAgreement = new FormControl('', Validators.required);
  shippingTerms = new FormControl('', Validators.required);
  billofLadingTerms = new FormControl('', Validators.required);
  customsInspection = new FormControl('', Validators.required);

  constructor(public contractbrowserService: contractbrowserService,public shippingTermsService: shippingTermsService, public OilLotService: OilLotService, fb: FormBuilder, private _formBuilder: FormBuilder) {
    this.myForm = fb.group({
      contractID: this.contractID,
      state: this.state,
      owner: this.owner,
      oilLot: this.oilLot,
      tradeAgreement: this.tradeAgreement,
      shippingTerms: this.shippingTerms,
      billofLadingTerms: this.billofLadingTerms,
      customsInspection: this.customsInspection
		});

		this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  };

  ngOnInit(): void {
		this.loadAll();

	}

	loadAll(): Promise<any> {
    const tempList = [];
    return this.contractbrowserService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
			this.allAssets = tempList;
			console.log(this.allAssets)
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
      $class: 'org.fin798.group2.masterContract',
      'contractID': this.contractID.value,
      'state': this.state.value,
      'owner': this.owner.value,
      'oilLot': this.oilLot.value,
      'tradeAgreement': this.tradeAgreement.value,
      'shippingTerms': this.shippingTerms.value,
      'billofLadingTerms': this.billofLadingTerms.value,
      'customsInspection': this.customsInspection.value
    };

    this.myForm.setValue({
      'contractID': null,
      'state': null,
      'owner': null,
      'oilLot': null,
      'tradeAgreement': null,
      'shippingTerms': null,
      'billofLadingTerms': null,
      'customsInspection': null
    });

    return this.contractbrowserService.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'contractID': null,
        'state': null,
        'owner': null,
        'oilLot': null,
        'tradeAgreement': null,
        'shippingTerms': null,
        'billofLadingTerms': null,
        'customsInspection': null
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
      $class: 'org.fin798.group2.masterContract',
      'state': this.state.value,
      'owner': this.owner.value,
      'oilLot': this.oilLot.value,
      'tradeAgreement': this.tradeAgreement.value,
      'shippingTerms': this.shippingTerms.value,
      'billofLadingTerms': this.billofLadingTerms.value,
      'customsInspection': this.customsInspection.value
    };

    return this.contractbrowserService.updateAsset(form.get('contractID').value, this.asset)
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

    return this.contractbrowserService.deleteAsset(this.currentId)
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

    return this.contractbrowserService.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'contractID': null,
        'state': null,
        'owner': null,
        'oilLot': null,
        'tradeAgreement': null,
        'shippingTerms': null,
        'billofLadingTerms': null,
        'customsInspection': null
      };

      if (result.contractID) {
        formObject.contractID = result.contractID;
      } else {
        formObject.contractID = null;
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

      if (result.oilLot) {
        formObject.oilLot = result.oilLot;
      } else {
        formObject.oilLot = null;
      }

      if (result.tradeAgreement) {
        formObject.tradeAgreement = result.tradeAgreement;
      } else {
        formObject.tradeAgreement = null;
      }

      if (result.shippingTerms) {
        formObject.shippingTerms = result.shippingTerms;
      } else {
        formObject.shippingTerms = null;
      }

      if (result.billofLadingTerms) {
        formObject.billofLadingTerms = result.billofLadingTerms;
      } else {
        formObject.billofLadingTerms = null;
      }

      if (result.customsInspection) {
        formObject.customsInspection = result.customsInspection;
      } else {
        formObject.customsInspection = null;
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
      'contractID': null,
      'state': null,
      'owner': null,
      'oilLot': null,
      'tradeAgreement': null,
      'shippingTerms': null,
      'billofLadingTerms': null,
      'customsInspection': null
      });
	}


	getSubcontract = (masterCon_id, subCon_id):Promise<any> => {
		//console.log(id.match(/resource:org.fin798.group2.tradeAgreement#[0-9]*/))
		//console.log(id.match(/#[0-9]*/))
		const tempList = []
		const filtered_id = subCon_id.match(/#[0-9]*/)[0].substring(1)
		console.log("filtered id is: " + filtered_id)
		return this.contractbrowserService.getQuery(filtered_id)
    .toPromise()
    .then((result) => {

			this.errorMessage = null;
			console.log(result)
      result.forEach(asset => {
        tempList.push(asset);
      });
			this.subContracts[masterCon_id] = tempList;
			this.loadAll();
			console.log("subContract: " + this.subContracts[masterCon_id][0])
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

	getShippingTerm = (masterCon_id, con_id):Promise<any> => {
		//console.log(id.match(/resource:org.fin798.group2.tradeAgreement#[0-9]*/))
		//console.log(id.match(/#[0-9]*/))
		const tempList = []
		const filtered_id = con_id.match(/#[0-9]*/)[0].substring(1)
		console.log("filtered id is: " + filtered_id)
		return this.shippingTermsService.getAsset(filtered_id)
    .toPromise()
    .then((result) => {

			this.errorMessage = null;
			//console.log(result)
			this.shippingTerm[masterCon_id] = [result];
			console.log(this.shippingTerm[masterCon_id])
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

	getLotInfo = (masterCon_id, lot_id):Promise<any> => {
		//console.log(id.match(/resource:org.fin798.group2.tradeAgreement#[0-9]*/))
		//console.log(id.match(/#[0-9]*/))
		const tempList = []
		const filtered_id = lot_id.match(/#[0-9]*/)[0].substring(1)
		console.log("filtered id is: " + filtered_id)
		return this.OilLotService.getAsset(filtered_id)
    .toPromise()
    .then((result) => {

			this.errorMessage = null;
			//console.log(result)
			this.lotInfo[masterCon_id] = [result];
			console.log(this.lotInfo[masterCon_id])
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
}

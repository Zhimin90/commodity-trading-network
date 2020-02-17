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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { masterContractComponent } from './masterContract/masterContract.component';
import { OilLotComponent } from './OilLot/OilLot.component';
import { tradeAgreementComponent } from './tradeAgreement/tradeAgreement.component';
import { shippingTermsComponent } from './shippingTerms/shippingTerms.component';
import { billofLadingTermsComponent } from './billofLadingTerms/billofLadingTerms.component';
import { customsInspectionComponent } from './customsInspection/customsInspection.component';

import { commodityProducerComponent } from './commodityProducer/commodityProducer.component';
import { producerCountryOpsComponent } from './producerCountryOps/producerCountryOps.component';
import { commodityPurchaserComponent } from './commodityPurchaser/commodityPurchaser.component';
import { trustedVendorComponent } from './trustedVendor/trustedVendor.component';
import { financialInstitutionComponent } from './financialInstitution/financialInstitution.component';

import { termsAgreementComponent } from './termsAgreement/termsAgreement.component';
import { shippingAgreementComponent } from './shippingAgreement/shippingAgreement.component';
import { outboundCustomsComponent } from './outboundCustoms/outboundCustoms.component';
import { inboundCustomsComponent } from './inboundCustoms/inboundCustoms.component';
import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';

import {ContractBrowserComponent} from './contract-browser/contract-browser.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'masterContract', component: masterContractComponent },
  { path: 'OilLot', component: OilLotComponent },
  { path: 'tradeAgreement', component: tradeAgreementComponent },
  { path: 'shippingTerms', component: shippingTermsComponent },
  { path: 'billofLadingTerms', component: billofLadingTermsComponent },
  { path: 'customsInspection', component: customsInspectionComponent },
  { path: 'commodityProducer', component: commodityProducerComponent },
  { path: 'producerCountryOps', component: producerCountryOpsComponent },
  { path: 'commodityPurchaser', component: commodityPurchaserComponent },
  { path: 'trustedVendor', component: trustedVendorComponent },
  { path: 'financialInstitution', component: financialInstitutionComponent },
  { path: 'termsAgreement', component: termsAgreementComponent },
  { path: 'shippingAgreement', component: shippingAgreementComponent },
  { path: 'outboundCustoms', component: outboundCustomsComponent },
  { path: 'inboundCustoms', component: inboundCustomsComponent },
  { path: 'SetupDemo', component: SetupDemoComponent },
  { path: 'contractBrowser', component: ContractBrowserComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }

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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
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

import { ContractBrowserComponent } from './contract-browser/contract-browser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MaterialDesignModule } from './material-design/material-design.module';
import { ContractTreeComponent } from './contract-tree/contract-tree.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    masterContractComponent,
    OilLotComponent,
    tradeAgreementComponent,
    shippingTermsComponent,
    billofLadingTermsComponent,
    customsInspectionComponent,
    commodityProducerComponent,
    producerCountryOpsComponent,
    commodityPurchaserComponent,
    trustedVendorComponent,
    financialInstitutionComponent,
    termsAgreementComponent,
    shippingAgreementComponent,
    outboundCustomsComponent,
    inboundCustomsComponent,
    SetupDemoComponent,
    ContractBrowserComponent,
    ContractTreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
		HttpModule,
		HttpClientModule,
    AppRoutingModule,
		BrowserAnimationsModule,
		MatSliderModule,
		MaterialDesignModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

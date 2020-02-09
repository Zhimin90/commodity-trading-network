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

/* global getAssetRegistry getFactory emit query */

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.fin798.group2.termsAgreement} termsAgreement - the termsAgreement to be initiated
 * @transaction
 */
async function termsSignature(termsAgreement) { // eslint-disable-line no-unused-vars
     
    termsAgreement.contractReference.tradeAgreement.state = 'Completed';
    termsAgreement.contractReference.state = 'Active';
  
    
    const contractRegistry = await getAssetRegistry('org.fin798.group2.masterContract');
    await contractRegistry.update(termsAgreement.contractReference);
  
    const tradeRegistry = await getAssetRegistry('org.fin798.group2.tradeAgreement');
    await tradeRegistry.update(termsAgreement.contractReference.tradeAgreement);
        
  }
  
  /**
   * Track the trade of a commodity from one trader to another
   * @param {org.fin798.group2.SetupDemo} SetupDemo - the Demo environment created
   * @transaction
   */
  
  async function setupDemo(SetupDemo) {  // eslint-disable-line no-unused-vars
  
      const factory = getFactory();
      const NS = 'org.fin798.group2';
  
      
      // create the commodityProducer
      const commodityProducer = factory.newResource(NS, 'commodityProducer', '15');
      commodityProducer.companyName = 'XY Oil';
      
  
      // create the commodityPurchaser
      const commodityPurchaser = factory.newResource(NS, 'commodityPurchaser', '67');
      commodityPurchaser.companyName = 'Company Alpha';
      
      // create the OilLot
      const OilLot = factory.newResource(NS, 'OilLot', '81');
      OilLot.description = 'Description of crude oil lot';
      OilLot.quantity = 15;
      OilLot.barrelGrade = 'ClassA';
      OilLot.owner = factory.newRelationship(NS, 'commodityProducer', '15');
  
      // create the masterContract
      const masterContract = factory.newResource(NS, 'masterContract', '13');
      masterContract.state = 'Drafted';
      masterContract.owner = factory.newRelationship(NS, 'commodityProducer','15');   
      masterContract.oilLot = factory.newRelationship(NS, 'OilLot','67');
      
      // Create the tradeAgreement
      const tradeAgreement = factory.newResource(NS, 'tradeAgreement', '18')
      tradeAgreement.state = 'Drafted';
      tradeAgreement.terms = 'Sample terms for agreement'
      tradeAgreement.seller = factory.newRelationship(NS, 'commodityProducer','15');
      tradeAgreement.buyer = factory.newRelationship(NS, 'commodityPurchaser', '67');
  
      //Update Master to Contain Terms agreement
      masterContract.tradeAgreement = tradeAgreement
    
    
      
    
      // add the commodityPurchaser
      const purchaserRegistry = await getParticipantRegistry(NS + '.commodityPurchaser');
      await purchaserRegistry.addAll([commodityPurchaser]);
        
      // add the commodityProducer
      const producerRegistry = await getParticipantRegistry(NS + '.commodityProducer');
      await producerRegistry.addAll([commodityProducer]);
    
      // add the oilLot
      const oilRegistry = await getAssetRegistry(NS + '.OilLot');
      await oilRegistry.addAll([OilLot]);
    
      // add the masterContract
      const masterConractRegistry = await getAssetRegistry(NS + '.masterContract');
      await masterConractRegistry .addAll([masterContract]);
    
      // add the tradeAgreement
      const tradeRegistry = await getAssetRegistry(NS + '.tradeAgreement');
      await tradeRegistry .addAll([tradeAgreement]);
        
  }  
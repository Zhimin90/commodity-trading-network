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
 * @param {org.fin798.group2.shippingAgreement} shippingAgreement - the shippingAgreement to be initiated
 * @transaction
 */
async function shippingSignature(shippingAgreement) { // eslint-disable-line no-unused-vars
    const factory = getFactory();
    const NS = 'org.fin798.group2';
     
    shippingAgreement.contractReference.shippingTerms.state = 'Active';
  	shippingAgreement.contractReference.oilLot.owner = factory.newRelationship(NS, 'commodityProducer', '99');

  
    const tradeRegistry = await getAssetRegistry('org.fin798.group2.shippingTerms');
    await tradeRegistry.update(shippingAgreement.contractReference.shippingTerms);
  
  	const oilRegistry = await getAssetRegistry('org.fin798.group2.OilLot');
    await oilRegistry.update(shippingAgreement.contractReference.oilLot);
        
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
      const commodityProducer = factory.newResource(NS, 'commodityProducer', '17');
      commodityProducer.companyName = 'XY Oil';
    
      // create the commodityProducer for ownership change during shipping
      const commodityProducer2 = factory.newResource(NS, 'commodityProducer', '99');
      commodityProducer2.companyName = 'Shipment Holding';
      
      // create the commodityPurchaser
      const commodityPurchaser = factory.newResource(NS, 'commodityPurchaser', '68');
      commodityPurchaser.companyName = 'Company Alpha';
    
      const commodityPurchaser2 = factory.newResource(NS, 'commodityPurchaser', '69');
      commodityPurchaser2.companyName = 'Company Beta';
    
      // create the trustedVendor
      const trustedVendor = factory.newResource(NS, 'trustedVendor', '12');
      trustedVendor.organizationInfo = 'Shipping Vendor';
    
    	// create the producerCountryOps
      const producerCountryOps = factory.newResource(NS, 'producerCountryOps', '2');
      producerCountryOps.organizationInfo = 'XY Oil CountryOps';
      
      // create the OilLot
      const OilLot = factory.newResource(NS, 'OilLot', '82');
      OilLot.description = 'Description of crude oil lot';
      OilLot.quantity = 15;
      OilLot.barrelGrade = 'ClassA';
      OilLot.owner = factory.newRelationship(NS, 'commodityProducer', '17');
    
      const OilLot2 = factory.newResource(NS, 'OilLot', '83');
      OilLot2.description = 'Description of crude oil lot';
      OilLot2.quantity = 17;
      OilLot2.barrelGrade = 'ClassB';
      OilLot2.owner = factory.newRelationship(NS, 'commodityProducer', '18');
  
      // create the masterContract
      const masterContract = factory.newResource(NS, 'masterContract', '13');
      masterContract.state = 'Drafted';
      masterContract.owner = factory.newRelationship(NS, 'commodityProducer','17');   
      masterContract.oilLot = factory.newRelationship(NS, 'OilLot','82');
    
      const masterContract2 = factory.newResource(NS, 'masterContract', '14');
      masterContract2.state = 'Drafted';
      masterContract2.owner = factory.newRelationship(NS, 'commodityProducer','17');   
      masterContract2.oilLot = factory.newRelationship(NS, 'OilLot','83');
      
      // Create the tradeAgreement
      const tradeAgreement = factory.newResource(NS, 'tradeAgreement', '19')
      tradeAgreement.state = 'Drafted';
      tradeAgreement.terms = 'Sample terms for agreement'
      tradeAgreement.seller = factory.newRelationship(NS, 'commodityProducer','17');
      tradeAgreement.buyer = factory.newRelationship(NS, 'commodityPurchaser', '68');
    
      const tradeAgreement2 = factory.newResource(NS, 'tradeAgreement', '20')
      tradeAgreement2.state = 'Drafted';
      tradeAgreement2.terms = 'Sample terms for agreement'
      tradeAgreement2.seller = factory.newRelationship(NS, 'commodityProducer','17');
      tradeAgreement2.buyer = factory.newRelationship(NS, 'commodityPurchaser', '69');
    
      // Create the shippingTerms
      const shippingTerms = factory.newResource(NS, 'shippingTerms', '1')
      shippingTerms.state = 'Drafted';
      shippingTerms.shippingDetails = 'Sample terms for agreement'
      shippingTerms.owner = factory.newRelationship(NS, 'producerCountryOps', '2');
      shippingTerms.validator = factory.newRelationship(NS, 'commodityPurchaser', '68');
      shippingTerms.vendors = [factory.newRelationship(NS, 'trustedVendor', '12')];
      shippingTerms.OilLot = factory.newRelationship(NS, 'OilLot','82');
    
      const shippingTerms2 = factory.newResource(NS, 'shippingTerms', '2')
      shippingTerms2.state = 'Drafted';
      shippingTerms2.shippingDetails = 'Sample terms for agreement'
      shippingTerms2.owner = factory.newRelationship(NS, 'producerCountryOps', '2');
      shippingTerms2.validator = factory.newRelationship(NS, 'commodityPurchaser', '69');
      shippingTerms2.vendors = [factory.newRelationship(NS, 'trustedVendor', '12')];
      shippingTerms2.OilLot = factory.newRelationship(NS, 'OilLot','83');
  
      //Update Master to Contain Terms agreement
      masterContract.tradeAgreement = tradeAgreement;
      masterContract.shippingTerms = shippingTerms;
    
      masterContract2.tradeAgreement = tradeAgreement2;
      masterContract2.shippingTerms = shippingTerms2;
    
    
      
    
      // add the commodityPurchaser
      const purchaserRegistry = await getParticipantRegistry(NS + '.commodityPurchaser');
      await purchaserRegistry.addAll([commodityPurchaser,commodityPurchaser2]);
        
      // add the commodityProducer
      const producerRegistry = await getParticipantRegistry(NS + '.commodityProducer');
      await producerRegistry.addAll([commodityProducer, commodityProducer2]);
    
    // add the trustedVendor
      const trustedVendorRegistry = await getParticipantRegistry(NS + '.trustedVendor');
      await trustedVendorRegistry.addAll([trustedVendor]);
    
    // add the producerCountryOps
      const producerCountryOpsRegistry = await getParticipantRegistry(NS + '.producerCountryOps');
      await producerCountryOpsRegistry.addAll([producerCountryOps]);
    
      // add the oilLot
      const oilRegistry = await getAssetRegistry(NS + '.OilLot');
      await oilRegistry.addAll([OilLot,OilLot2]);
    
      // add the masterContract
      const masterConractRegistry = await getAssetRegistry(NS + '.masterContract');
      await masterConractRegistry.addAll([masterContract,masterContract2]);
    
      // add the tradeAgreement
      const tradeRegistry = await getAssetRegistry(NS + '.tradeAgreement');
      await tradeRegistry.addAll([tradeAgreement,tradeAgreement2]);
    
      // add the shippingTerms
      const shippingRegistry = await getAssetRegistry(NS + '.shippingTerms');
      await shippingRegistry.addAll([shippingTerms,shippingTerms2]);
        
  }  
import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
 //export namespace org.example.trading{
   export enum contractState {
      Drafted,
      Active,
      Completed,
      Signed,
      Void,
   }
   export class masterContract extends Asset {
      contractID: string;
      state: contractState;
      owner: commodityProducer;
      oilLot: OilLot;
      tradeAgreement: tradeAgreement;
      shippingTerms: shippingTerms;
      billofLadingTerms: billofLadingTerms;
      customsInspection: customsInspection;
   }
   export enum oilGrade {
      ClassA,
      ClassB,
      ClassC,
      ClassD,
   }
   export class OilLot extends Asset {
      LotID: string;
      description: string;
      quantity: number;
      barrelGrade: oilGrade;
      owner: commodityProducer;
   }
   export class tradeAgreement extends Asset {
      agreementID: string;
      terms: string;
      state: contractState;
      seller: commodityProducer;
      buyer: commodityPurchaser;
   }
   export class shippingTerms extends Asset {
      shippingID: string;
      shippingDetails: string;
      state: contractState;
      owner: producerCountryOps;
      validator: commodityPurchaser;
      vendors: trustedVendor[];
      OilLot: OilLot;
   }
   export class billofLadingTerms extends Asset {
      OutBoundCustomsID: string;
      ladingDetails: string;
      state: contractState;
      owner: commodityProducer;
      validator: commodityPurchaser;
      OilLot: OilLot;
   }
   export class customsInspection extends Asset {
      inboundCustomsID: string;
      landingDetails: string;
      state: contractState;
      owner: commodityProducer;
      validator: commodityPurchaser;
      OilLot: OilLot;
   }
   export class commodityProducer extends Participant {
      organizationid: string;
      companyName: string;
   }
   export class producerCountryOps extends Participant {
      organizationid: string;
      organizationInfo: string;
   }
   export class commodityPurchaser extends Participant {
      organizationid: string;
      companyName: string;
   }
   export class trustedVendor extends Participant {
      organizationid: string;
      organizationInfo: string;
   }
   export class financialInstitution extends Participant {
      organizationid: string;
      organizationInfo: string;
   }
   export abstract class ownershipTransfer extends Transaction {
      commodity: OilLot;
      newOwner: commodityPurchaser;
   }
   export class termsAgreement extends Transaction {
      contractReference: masterContract;
   }
   export class shippingAgreement extends ownershipTransfer {
      contractReference: shippingTerms;
   }
   export class outboundCustoms extends ownershipTransfer {
      contractReference: billofLadingTerms;
   }
   export class inboundCustoms extends ownershipTransfer {
      contractReference: customsInspection;
   }
   export class TradeNotification extends Event {
      reference: masterContract;
      notificationRecipient: financialInstitution;
   }
   export class SetupDemo extends Transaction {
   }
 //}

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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app');
    })
  });

  it('network-name should be commodity-trade-network@0.2.6-deploy.77',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('commodity-trade-network@0.2.6-deploy.77.bna');
    });
  });

  it('navbar-brand should be angular-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('angular-app');
    });
  });

  
    it('masterContract component should be loadable',() => {
      page.navigateTo('/masterContract');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('masterContract');
      });
    });

    it('masterContract table should have 9 columns',() => {
      page.navigateTo('/masterContract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  
    it('OilLot component should be loadable',() => {
      page.navigateTo('/OilLot');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('OilLot');
      });
    });

    it('OilLot table should have 6 columns',() => {
      page.navigateTo('/OilLot');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('tradeAgreement component should be loadable',() => {
      page.navigateTo('/tradeAgreement');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('tradeAgreement');
      });
    });

    it('tradeAgreement table should have 6 columns',() => {
      page.navigateTo('/tradeAgreement');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('shippingTerms component should be loadable',() => {
      page.navigateTo('/shippingTerms');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('shippingTerms');
      });
    });

    it('shippingTerms table should have 8 columns',() => {
      page.navigateTo('/shippingTerms');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('billofLadingTerms component should be loadable',() => {
      page.navigateTo('/billofLadingTerms');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('billofLadingTerms');
      });
    });

    it('billofLadingTerms table should have 7 columns',() => {
      page.navigateTo('/billofLadingTerms');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('customsInspection component should be loadable',() => {
      page.navigateTo('/customsInspection');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('customsInspection');
      });
    });

    it('customsInspection table should have 7 columns',() => {
      page.navigateTo('/customsInspection');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('commodityProducer component should be loadable',() => {
      page.navigateTo('/commodityProducer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('commodityProducer');
      });
    });

    it('commodityProducer table should have 3 columns',() => {
      page.navigateTo('/commodityProducer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('producerCountryOps component should be loadable',() => {
      page.navigateTo('/producerCountryOps');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('producerCountryOps');
      });
    });

    it('producerCountryOps table should have 3 columns',() => {
      page.navigateTo('/producerCountryOps');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('commodityPurchaser component should be loadable',() => {
      page.navigateTo('/commodityPurchaser');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('commodityPurchaser');
      });
    });

    it('commodityPurchaser table should have 3 columns',() => {
      page.navigateTo('/commodityPurchaser');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('trustedVendor component should be loadable',() => {
      page.navigateTo('/trustedVendor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('trustedVendor');
      });
    });

    it('trustedVendor table should have 3 columns',() => {
      page.navigateTo('/trustedVendor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('financialInstitution component should be loadable',() => {
      page.navigateTo('/financialInstitution');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('financialInstitution');
      });
    });

    it('financialInstitution table should have 3 columns',() => {
      page.navigateTo('/financialInstitution');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('termsAgreement component should be loadable',() => {
      page.navigateTo('/termsAgreement');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('termsAgreement');
      });
    });
  
    it('shippingAgreement component should be loadable',() => {
      page.navigateTo('/shippingAgreement');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('shippingAgreement');
      });
    });
  
    it('outboundCustoms component should be loadable',() => {
      page.navigateTo('/outboundCustoms');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('outboundCustoms');
      });
    });
  
    it('inboundCustoms component should be loadable',() => {
      page.navigateTo('/inboundCustoms');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('inboundCustoms');
      });
    });
  
    it('SetupDemo component should be loadable',() => {
      page.navigateTo('/SetupDemo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetupDemo');
      });
    });
  

});
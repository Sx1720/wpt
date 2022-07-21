'use strict';

import {SubAppsService, SubAppsServiceReceiver, SubAppsServiceResult} from '/gen/third_party/blink/public/mojom/subapps/sub_apps_service.mojom.m.js';

self.SubAppsServiceTest = (() => {
  // Class that mocks SubAppsService interface defined in /third_party/blink/public/mojom/subapps/sub_apps_service.mojom

  class MockSubAppsService {
    constructor() {
      this.interceptor_ =
        new MojoInterfaceInterceptor(SubAppsService.$interfaceName);
      this.receiver_ = new SubAppsServiceReceiver(this);
      this.interceptor_.oninterfacerequest =
        e => this.receiver_.$.bindHandle(e.handle);
      this.interceptor_.start();
    }

    reset() {
      this.interceptor_.stop();
      this.receiver_.$.close();
    }

    add(sub_apps) {
      return Promise.resolve({
        result: testInternal.addCallReturnValue,
      });
    }

    list() {
      return Promise.resolve({
        result: {
          code: testInternal.serviceResultCode,
          subAppIds: []
        }
      });
    }

    remove() {
      return Promise.resolve({
        result: testInternal.serviceResultCode,
      });
    }
  }

  let testInternal = {
    initialized: false,
    mockSubAppsService: null,
    serviceResultCode: 0,
    addCallReturnValue: []
  }

  class SubAppsServiceTestChromium {
    constructor() {
      Object.freeze(this);  // Make it immutable.
    }

    initialize(service_result_code) {
      if (!testInternal.initialized) {
        testInternal = {
          mockSubAppsService: new MockSubAppsService(),
          initialized: true,
          serviceResultCode: service_result_code,
          addCallReturnValue: []
        };
      };
      if (service_result_code == 1) {
        testInternal.addCallReturnValue = [{unhashedAppId: "mock-app-id", resultCode: 3}];
      };
    }

    async reset() {
      if (testInternal.initialized) {
        testInternal.mockSubAppsService.reset();
        testInternal = {
          mockSubAppsService: null,
          initialized: false,
          serviceResultCode: 0,
          addCallReturnValue: []
        };
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
  }

  return SubAppsServiceTestChromium;
})();

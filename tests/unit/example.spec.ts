
import jestSum from "do-jest/01-sum";
import jestMatcher from "do-jest/02-matcher";
import jestError from "do-jest/03-error";
import jestAsyncCode from "do-jest/04-async-code";
import jestDuplicate from "do-jest/05-duplicate";
import jestMock from "do-jest/06-mock";

import jestCreashCourse from "do-jest/21-crash-course";
import jestMessage from "do-jest/22-message";
import jestConditionRendering from "do-jest/23-condition-rendering";
import jestEventHandling from "do-jest/24-event-handling";
import jestFormHandling from "do-jest/25-form-handling";
import jestPassData from "do-jest/26-pass-data";
import jestSlots from "do-jest/27-slots";
import jestHttpRequest from "do-jest/28-http-request";
import jestTransition from "do-jest/29-transition";
import jestComInstance from 'do-jest/30-com-instance';
import jestVuex from 'do-jest/31-vuex';
import jestVueRouter from 'do-jest/32-vue-router';
import jestTeleport from 'do-jest/33-teleport';
import jestStubChild from 'do-jest/34-stub-child';


/*
  beforeEach(() => {
    console.log("beforeEach(out of describe block) called....");
  });
  afterEach(() => {
    console.log("afterEach(out of describe block) called....");
  });
  beforeAll(() => {
    console.log("beforeAll(out of describe block) called....");
  });
  afterAll(() => {
    console.log("afterAll(out of describe block) called....");
  });
*/
import { unlink } from 'fs.promises'; //example.spec.ts.snap
beforeAll(async () => {
  try {
    await unlink('tests/unit/__snapshots__/example.spec.ts.snap'); //为什么实际删不掉呢???还报告删除成功.删别的就可以
    console.log('文件 删除成功');
  } catch (err) {
    console.log('删除文件异常:', err);
  }
});

describe('now testing all of vue-win:', () => {
  // jestSum();
  // jestMatcher();
  // jestError();
  // jestAsyncCode();
  // jestDuplicate();
  jestMock();

  // jestCreashCourse();
  // jestMessage();
  //jestConditionRendering();
  //jestEventHandling();
  //jestFormHandling();
  //jestPassData();
  //jestSlots();
  //jestHttpRequest();
  //jestTransition();
  //jestComInstance();
  //jestVuex();
  //jestVueRouter();
  //jestTeleport();
  //jestStubChild();
});

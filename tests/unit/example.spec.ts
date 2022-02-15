
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

describe('now testing all of vue-win:', () => {
  // jestSum();
  // jestMatcher();
  // jestError();
  // jestAsyncCode();
  // jestDuplicate();
  // jestMock();

  // jestCreashCourse();
  // jestMessage();
  //jestConditionRendering();
  jestEventHandling();
});

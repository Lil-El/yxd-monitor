import { injectError } from "./lib/jsError";
import { injectXHR } from "./lib/xhr";
import { timing } from "./lib/timing";
injectError();
injectXHR();
timing();

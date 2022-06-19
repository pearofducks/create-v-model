import { GlobalRegistrator } from '@happy-dom/global-registrator';

GlobalRegistrator.register();
// fix for setTimeout bug in Vue's runtime core
// we need to be able to cancel their timeout in our test.after hook
global.setTimeout = window.setTimeout

export { GlobalRegistrator }

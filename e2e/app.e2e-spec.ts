// tslint:disable:no-let
import { AppPage } from './app.po';

// tslint:disable:no-floating-promises
describe('any-mind-platform App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

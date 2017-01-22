
describe('QuickStart E2E Tests', function () {

	var expectedMsg = 'Singin';


  beforeEach(function () {
    browser.get('');
  });

  it('should display: ' + expectedMsg, function () {
    expect(element(by.css('div.panel-title')).getText()).toEqual(expectedMsg);
  });

});

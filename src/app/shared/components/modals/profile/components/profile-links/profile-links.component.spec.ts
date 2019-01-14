import { ProfileLinksComponent } from './profile-links.component';
import { ProfileLinksComponentService } from './profile-links.component.service';
import { FormControl } from '@angular/forms';

describe('ProfileLinksComponent', () => {
  let profileLinksComponent: ProfileLinksComponent;
  const profileLinksComponentService = new ProfileLinksComponentService();
  // tslint:disable-next-line:no-empty
  const onModelChangeFnMock = ([]): void => {};
  beforeEach(() => {
    profileLinksComponent = new ProfileLinksComponent(profileLinksComponentService);
    profileLinksComponent.registerOnChange(onModelChangeFnMock);
  });

  it('should add link to list', () => {
    profileLinksComponent.onChangeValue('www.anymind.com');
    expect(profileLinksComponent.linksList).toEqual([{ link: 'http://www.anymind.com' }]);
  });

  it('should add several links to list', () => {
    profileLinksComponent.writeValue(['https://www.anymind.com', 'www.maxcompany.com', 'http://randomsite.com']);
    expect(profileLinksComponent.linksList).toEqual([
      { link: 'https://www.anymind.com' },
      { link: 'www.maxcompany.com' },
      { link: 'http://randomsite.com' },
    ]);
  });

  it('should add social link to list', () => {
    profileLinksComponent.onChangeValue('www.facebook.com/malywariat');
    expect(profileLinksComponent.linksList).toEqual([
      {
        link: 'https://www.facebook.com/malywariat',
        icon: 'icon icon-facebook',
        shortName: 'malywariat',
      },
    ]);
  });

  it('should not add link when link is already on list', () => {
    profileLinksComponent.linksList = [{ link: 'http://www.anymind.com' }];
    profileLinksComponent.linksFormControl = new FormControl();
    profileLinksComponent.onChangeValue('www.anymind.com');
    expect(
      profileLinksComponent.linksFormControl.hasError(
        'EDIT_PROFILE.CONTENT.CREATE_EXPERT_PROFILE.ADD_LINK.VALIDATION.VALUE_EXIST',
      ),
    ).toEqual(true);
  });

  it('should delete link from list', () => {
    const linkOne = { link: 'http://www.anymind.com' };
    const linkTwo = { link: 'http://www.randomsite.com' };
    profileLinksComponent.linksList = [linkOne, linkTwo];
    profileLinksComponent.onDeleteClick(linkTwo);
    expect(profileLinksComponent.linksList).toEqual([linkOne]);
  });

  describe('test url pattern', () => {
    it('should pass on anymind.com', () => {
      expect(profileLinksComponent.urlPattern.test('anymind.com')).toEqual(true);
    });
    it('should pass on www.anymind.com', () => {
      expect(profileLinksComponent.urlPattern.test('www.anymind.com')).toEqual(true);
    });
    it('should pass on https://www.anymind.com', () => {
      expect(profileLinksComponent.urlPattern.test('https://www.anymind.com')).toEqual(true);
    });
    it('should pass on http://www.anymind.com', () => {
      expect(profileLinksComponent.urlPattern.test('http://www.anymind.com')).toEqual(true);
    });
    it('should pass on http://www.anymind.com/some?id=123', () => {
      expect(profileLinksComponent.urlPattern.test('http://www.anymind.com/some?id=123')).toEqual(true);
    });
    it('should pass on http://www.ANYMIND.com', () => {
      expect(profileLinksComponent.urlPattern.test('http://www.ANYMIND.com')).toEqual(true);
    });
    it('should fail on http://www.-anymind.com', () => {
      expect(profileLinksComponent.urlPattern.test('http://www.-anymind.com')).toEqual(false);
    });
    it('should fail on link with domain longer than 63 characters', () => {
      expect(
        profileLinksComponent.urlPattern.test(
          'www.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.pl',
        ),
      ).toEqual(false);
    });
    it('should fail on www.anymind.123', () => {
      expect(profileLinksComponent.urlPattern.test('www.anymind.123')).toEqual(false);
    });
  });
});

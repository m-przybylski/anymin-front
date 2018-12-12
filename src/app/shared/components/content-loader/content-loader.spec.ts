// tslint:disable:readonly-array
// tslint:disable:max-file-line-count

import { ContentLoaderComponent } from '@platform/shared/components/content-loader/content-loader.component';

describe('ContentLoaderComponent', () => {
  let contentLoaderComponent: ContentLoaderComponent;
  const rectSides = {
    width: 100,
    height: 50,
  };

  it('should create horizontal loader animation', () => {
    const result = '50%';

    const element = {
      nativeElement: {
        clientHeight: rectSides.height,
        clientWidth: rectSides.width,
      },
    };

    contentLoaderComponent = new ContentLoaderComponent(element);

    contentLoaderComponent.ngOnInit();
    expect(contentLoaderComponent.gradientY2).toEqual(result);
    expect(contentLoaderComponent.gradientX2).toEqual('100%');
  });

  it('should create vertical loader animation', () => {
    const result = '50%';

    const element = {
      nativeElement: {
        clientHeight: rectSides.width,
        clientWidth: rectSides.height,
      },
    };

    contentLoaderComponent = new ContentLoaderComponent(element);

    contentLoaderComponent.ngOnInit();
    expect(contentLoaderComponent.gradientX2).toEqual(result);
    expect(contentLoaderComponent.gradientY2).toEqual('100%');
  });
});

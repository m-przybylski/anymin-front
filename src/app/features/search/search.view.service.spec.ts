import { provideMockFactoryLogger } from 'testing/testing';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ISearchResults, SearchViewService } from '@platform/features/search/search.view.service';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { GetSearchRequestResult, GetSuggestedTags, SearchService } from '@anymind-ng/api';
import { cold } from 'jasmine-marbles';

describe('SearchViewService', () => {
  let searchViewService: SearchViewService;
  let searchService: SearchService;
  let store: Store<any>;
  let loggerFactory: LoggerFactory;
  let alertService: AlertService;

  const loggerService: LoggerService = Deceiver(LoggerService, {
    warn: jest.fn(),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchViewService,
        {
          provide: SearchService,
          useValue: Deceiver(SearchService),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, {
            pushDangerAlert: jest.fn(),
            closeAllAlerts: jest.fn(),
          }),
        },
        provideMockFactoryLogger(loggerService),
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          isLoggedIn: combineReducers(fromCore.getLoggedIn),
        }),
      ],
    });

    searchViewService = TestBed.get(SearchViewService);
    searchService = TestBed.get(SearchService);
    loggerFactory = TestBed.get(LoggerFactory);
    alertService = TestBed.get(AlertService);
    store = TestBed.get(Store);
    (loggerService.warn as jest.Mock).mockClear();
  });

  it('should return search results if request succeeds', () => {
    const requestParams = {
      queryParams: {
        query: 'anymind',
        tags: ['anymindTag'],
      },
      showOnlyAvailable: true,
      offset: 0,
    };

    const getSearchResultMock: ReadonlyArray<GetSearchRequestResult> = [
      {
        service: {
          id: 'string',
          ownerId: 'string',
          name: 'string',
          price: {
            value: 1,
            currency: 'PLN',
          },
        },
        ownerProfile: {
          id: 'string',
          name: 'string',
          avatar: 'string',
        },
        expertProfile: {
          id: 'string',
          name: 'string',
          avatar: 'string',
        },
        rating: 0,
        usageCounter: 1,
        score: 0,
        status: GetSearchRequestResult.StatusEnum.Available,
      },
    ];

    const sendQueryTagSuggestionMock: GetSuggestedTags = {
      tags: ['anymindTag'],
    };

    const result: ISearchResults = {
      suggestionTags: ['anymindTag'],
      searchResultsConsultations: getSearchResultMock,
      currentQueryParams: requestParams.queryParams,
    };

    const getSearchResultResponse = cold('-a|', { a: getSearchResultMock });
    const sendQueryTagSuggestionResponse = cold('-a|', { a: sendQueryTagSuggestionMock });
    const expected = cold('--(b|)', { b: result });

    searchService.postTagsSuggestionsRoute = jest.fn().mockReturnValue(sendQueryTagSuggestionResponse);
    searchService.postSearchRoute = jest.fn().mockReturnValue(getSearchResultResponse);

    expect(searchViewService.updateSearchResults(requestParams.queryParams, true, 0)).toBeObservable(expected);
  });

  it('should stop search stream if search service request return error', () => {
    const requestParams = {
      queryParams: {
        query: 'anymind',
        tags: ['anymindTag'],
      },
    };

    const sendQueryTagSuggestionMock: GetSuggestedTags = {
      tags: ['anymindTag'],
    };

    const sendQueryTagSuggestionResponse = cold('-a|', { a: sendQueryTagSuggestionMock });
    const getSearchResultResponse = cold('-#|', {}, 'error');

    const expected = cold('-|', {}, 'error');

    searchService.postTagsSuggestionsRoute = jest.fn().mockReturnValue(sendQueryTagSuggestionResponse);
    searchService.postSearchRoute = jest.fn().mockReturnValue(getSearchResultResponse);

    expect(searchViewService.updateSearchResults(requestParams.queryParams, false, 0)).toBeObservable(expected);
    expect(alertService.pushDangerAlert).toHaveBeenCalled();
  });
});

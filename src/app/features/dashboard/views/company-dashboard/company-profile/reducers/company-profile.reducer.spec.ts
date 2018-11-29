import { reducer, IState } from './company-profile.reducer';
import { CompanyProfileApiActions } from '../actions';

const initialState: IState = {
  consultations: [],
};

describe('company profile reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('LoadCompanyConsultationsSuccess action', () => {
    it('should add consultations to store', () => {
      const payload = [
        {
          service: {},
          employments: [{ id: 1 }, { id: 2 }, { id: 3 }],
        },
        {
          service: {},
          employments: [{ id: 5 }, { id: 6 }, { id: 7 }],
        },
      ] as any;
      const result = reducer(initialState, new CompanyProfileApiActions.LoadCompanyConsultationsSuccessAction(payload));
      expect(result).toEqual({
        consultations: [
          {
            service: {},
            employments: [{ id: 1 }, { id: 2 }, { id: 3 }],
          },
          {
            service: {},
            employments: [{ id: 5 }, { id: 6 }, { id: 7 }],
          },
        ],
      } as any);
    });
  });
  describe('DeleteEmploymentSuccessAction action', () => {
    it('should remove expert from consultation', () => {
      const state = {
        consultations: [
          {
            service: {},
            employments: [{ id: '1' }, { id: '2' }, { id: '3' }],
          },
          {
            service: {},
            employments: [{ id: '5' }, { id: '6' }, { id: '7' }],
          },
        ],
      } as any;
      const result = reducer(state, new CompanyProfileApiActions.DeleteEmploymentSuccessAction('7'));
      expect(result).toEqual({
        consultations: [
          {
            service: {},
            employments: [{ id: '1' }, { id: '2' }, { id: '3' }],
          },
          {
            service: {},
            employments: [{ id: '5' }, { id: '6' }],
          },
        ],
      } as any);
    });
  });
});

// tslint:disable:cyclomatic-complexity
import { GetExpertVisibility } from '@anymind-ng/api';
import {
  VisibilityInitActions,
  VisibilityApiActions,
  VisibilityUiActions,
  VisibilityWSActions,
} from '@platform/features/dashboard/actions';

export interface IState {
  visibility: GetExpertVisibility.VisibilityEnum;
}

export const initialStatus: IState = {
  visibility: GetExpertVisibility.VisibilityEnum.Invisible,
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(
  state = initialStatus,
  action:
    | VisibilityUiActions.VisilbilityUiActionsUnion
    | VisibilityInitActions.VisilbilityInitActionsUnion
    | VisibilityApiActions.VisilbilityApiActionsUnion
    | VisibilityWSActions.VisibilityWSActionsUnion,
): IState {
  switch (action.type) {
    case VisibilityApiActions.VisibilityApiActionTypes.SetUiVisilbilityInvisibleError:
    case VisibilityApiActions.VisibilityApiActionTypes.SetUiVisilbilityVisibleSuccess:
    case VisibilityWSActions.VisibilityWSActionTypes.SetWSVisibilityVisible:
    case VisibilityUiActions.VisibilityUiActionTypes.SetUiVisilbilityVisible: {
      return {
        ...state,
        visibility: GetExpertVisibility.VisibilityEnum.Visible,
      };
    }

    case VisibilityApiActions.VisibilityApiActionTypes.SetUiVisilbilityInvisibleSuccess:
    case VisibilityApiActions.VisibilityApiActionTypes.SetUiVisilbilityVisibleError:
    case VisibilityWSActions.VisibilityWSActionTypes.SetWSVisibilityInvisible:
    case VisibilityUiActions.VisibilityUiActionTypes.SetUiVisilbilityInvisible: {
      return {
        ...state,
        visibility: GetExpertVisibility.VisibilityEnum.Invisible,
      };
    }

    case VisibilityApiActions.VisibilityApiActionTypes.FetchInitVisilbilitySuccess: {
      return {
        ...state,
        visibility: action.payload.visibility,
      };
    }

    case VisibilityInitActions.VisibilityInitActionTypes.FetchInitVisilbility:
    default:
      return state;
  }
}

export const getVisibility = (state: IState): GetExpertVisibility.VisibilityEnum => state.visibility;

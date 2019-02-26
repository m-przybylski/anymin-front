// tslint:disable:cyclomatic-complexity
import { GetExpertVisibility } from '@anymind-ng/api';
import {
  VisibilityApiActions,
  VisibilityInitActions,
  VisibilityUiActions,
  VisibilityWSActions,
} from '@platform/core/actions';

export interface IState {
  visibility: GetExpertVisibility.VisibilityEnum | undefined;
}

export const initialStatus: IState = {
  visibility: GetExpertVisibility.VisibilityEnum.Invisible,
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(
  state = initialStatus,
  action:
    | VisibilityUiActions.VisibilityUiActionsUnion
    | VisibilityInitActions.VisibilityInitActionsUnion
    | VisibilityApiActions.VisibilityApiActionsUnion
    | VisibilityWSActions.VisibilityWSActionsUnion,
): IState {
  switch (action.type) {
    case VisibilityApiActions.VisibilityApiActionTypes.SetUiVisibilityInvisibleError:
    case VisibilityWSActions.VisibilityWSActionTypes.SetWSVisibilityVisible:
    case VisibilityUiActions.VisibilityUiActionTypes.SetUiVisibilityVisible: {
      return {
        ...state,
        visibility: GetExpertVisibility.VisibilityEnum.Visible,
      };
    }

    case VisibilityApiActions.VisibilityApiActionTypes.FetchInitVisibilityError: {
      return {
        ...state,
        visibility: undefined,
      };
    }

    case VisibilityApiActions.VisibilityApiActionTypes.SetUiVisibilityVisibleError:
    case VisibilityWSActions.VisibilityWSActionTypes.SetWSVisibilityInvisible:
    case VisibilityUiActions.VisibilityUiActionTypes.SetUiVisibilityInvisible: {
      return {
        ...state,
        visibility: GetExpertVisibility.VisibilityEnum.Invisible,
      };
    }

    case VisibilityApiActions.VisibilityApiActionTypes.FetchInitVisibilitySuccess: {
      return {
        ...state,
        visibility: action.payload.visibility,
      };
    }

    default:
      return state;
  }
}

export const getVisibility = (state: IState): GetExpertVisibility.VisibilityEnum | undefined => state.visibility;

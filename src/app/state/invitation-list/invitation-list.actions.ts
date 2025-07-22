import {createAction, props} from '@ngrx/store';
import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {InvitationDto} from '../../interfaces/member/invitation.dto';

export const invitationListDataSuccess = createAction(
  "[Invitation List State] Invitation list data success",
  props<{ invitationListData: PaginatedListDataInterface<InvitationDto> }>()
);

export const invitationListDataClear = createAction(
  "[Invitation List State] Invitation list data clear",
);

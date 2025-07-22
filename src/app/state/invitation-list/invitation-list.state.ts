import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {InvitationDto} from '../../interfaces/member/invitation.dto';

export interface InvitationListState {
  invitationListData: PaginatedListDataInterface<InvitationDto> | null;
}

export const initialState: InvitationListState = {
  invitationListData: null,
};
